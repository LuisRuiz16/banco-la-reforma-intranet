import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, AccessGate } from "../src/auth/AuthContext";
import DailyMessage from "../src/message/DailyMessage";

afterEach(cleanup);
it("si falla la lectura no permite reemplazar a ciegas el mensaje", async () => {
  const test = setup("ADMIN");
  test.api.read.mockRejectedValue(new Error("API no disponible"));
  test.show();
  await screen.findByRole("alert");
  expect(screen.queryByRole("button", { name: "Editar mensaje" })).toBe(null);
  expect(
    screen.getByRole("button", { name: "Volver a consultar" }),
  ).toBeTruthy();
});
const current = {
  id: 1,
  content: "Bienvenidos al equipo.",
  updated_at: "2026-10-29T15:00:00Z",
};
function setup(role = "EMPLEADO", status = "authenticated") {
  const state = {
    status,
    canRead: true,
    canEdit: role === "ADMIN",
    role,
    name: "Usuario de prueba",
  };
  const session = {
    getSnapshot: () => state,
    subscribe: () => () => {},
    login: vi.fn(),
    logout: vi.fn(),
  };
  const api = {
    configured: true,
    read: vi.fn().mockResolvedValue(current),
    update: vi.fn().mockResolvedValue({ ...current, content: "Nuevo mensaje" }),
  };
  return {
    api,
    session,
    show: () =>
      render(
        <AuthProvider session={session}>
          <AccessGate>
            <DailyMessage api={api} />
          </AccessGate>
        </AuthProvider>,
      ),
  };
}
it("EMPLEADO lee pero no ve botones ni formularios para editar", async () => {
  const test = setup();
  test.show();
  await screen.findByText(current.content);
  expect(screen.queryByRole("button", { name: "Editar mensaje" })).toBe(null);
  expect(screen.queryByRole("textbox")).toBe(null);
  expect(test.api.update).not.toHaveBeenCalled();
});
it("ADMIN edita, guarda y ve el contenido confirmado por la API", async () => {
  const user = userEvent.setup();
  const test = setup("ADMIN");
  test.show();
  await screen.findByText(current.content);
  await user.click(screen.getByRole("button", { name: "Editar mensaje" }));
  const field = screen.getByRole("textbox", { name: "Mensaje institucional" });
  await user.clear(field);
  await user.type(field, "Nuevo mensaje");
  await user.click(screen.getByRole("button", { name: "Guardar mensaje" }));
  await screen.findByText("Mensaje guardado para todo el equipo.");
  expect(test.api.update).toHaveBeenCalledWith(
    "Nuevo mensaje",
    expect.any(AbortSignal),
  );
  expect(screen.getByText("Nuevo mensaje")).toBeTruthy();
});
it("al rechazar un guardado conserva el borrador y no anuncia éxito", async () => {
  const user = userEvent.setup();
  const test = setup("ADMIN");
  test.api.update.mockRejectedValue(
    new Error("La API no autorizó esta acción."),
  );
  test.show();
  await screen.findByText(current.content);
  await user.click(screen.getByRole("button", { name: "Editar mensaje" }));
  await user.click(screen.getByRole("button", { name: "Guardar mensaje" }));
  expect((await screen.findByRole("alert")).textContent).toContain(
    "no autorizó",
  );
  expect(screen.getByRole("textbox").value).toBe(current.content);
  expect(screen.queryByText("Mensaje guardado para todo el equipo.")).toBe(
    null,
  );
});
it("cancelar descarta el borrador sin enviar actualización", async () => {
  const user = userEvent.setup();
  const test = setup("ADMIN");
  test.show();
  await screen.findByText(current.content);
  await user.click(screen.getByRole("button", { name: "Editar mensaje" }));
  await user.clear(screen.getByRole("textbox"));
  await user.click(screen.getByRole("button", { name: "Cancelar" }));
  expect(screen.getByText(current.content)).toBeTruthy();
  expect(test.api.update).not.toHaveBeenCalled();
});
it("sin configuración no llama la API ni ofrece editar", () => {
  const test = setup("ADMIN");
  test.api.configured = false;
  test.show();
  expect(
    screen.getByText("El mensaje del día estará disponible próximamente."),
  ).toBeTruthy();
  expect(test.api.read).not.toHaveBeenCalled();
  expect(screen.queryByRole("button", { name: "Editar mensaje" })).toBe(null);
});
it("en modo informativo no consulta ni permite editar aunque exista API", () => {
  const test = setup("", "public");
  test.show();
  expect(test.api.read).not.toHaveBeenCalled();
});
it.each(["denied", "expired", "error", "loading"])(
  "no muestra la intranet cuando el acceso está %s",
  (status) => {
    const test = setup("", status);
    test.show();
    expect(screen.queryByText("Mensaje del día")).toBe(null);
    expect(test.api.read).not.toHaveBeenCalled();
  },
);
it("cancela la solicitud al salir de Inicio", async () => {
  const test = setup();
  const page = test.show();
  await waitFor(() => expect(test.api.read).toHaveBeenCalled());
  const signal = test.api.read.mock.calls[0][0];
  page.unmount();
  expect(signal.aborted).toBe(true);
});
it("presenta el mensaje como texto, sin ejecutar HTML del servidor", async () => {
  const test = setup();
  test.api.read.mockResolvedValue({
    ...current,
    content: "<img src=x onerror=alert(1)>",
  });
  test.show();
  await screen.findByText("<img src=x onerror=alert(1)>");
  expect(screen.queryByRole("img")).toBe(null);
});
