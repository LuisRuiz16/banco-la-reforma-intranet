import { it, expect, vi } from "vitest";
import { createMessageApi, validateContent } from "../src/message/api";
import { PermissionError } from "../src/auth/session";
const config = {
  readUrl: "https://api.example/message",
  writeUrl: "https://api.example/message",
  writeMethod: "PUT",
};
const message = {
  id: 1,
  content: "Aviso institucional",
  updated_at: "2026-10-29T15:00:00Z",
};
function setup() {
  const session = {
    getToken: vi.fn().mockResolvedValue("test-only-token"),
    expire: vi.fn(),
  };
  const fetcher = vi
    .fn()
    .mockImplementation(async () => new Response(JSON.stringify(message)));
  return { session, fetcher, api: createMessageApi(config, session, fetcher) };
}
it("envía token en lectura y solo content en escritura; no envía autor ni fecha", async () => {
  const { api, session, fetcher } = setup();
  await api.read();
  expect(session.getToken).toHaveBeenCalledWith(false);
  expect(fetcher.mock.calls[0][1].headers.Authorization).toBe(
    "Bearer test-only-token",
  );
  await api.update("  Nuevo aviso  ");
  const options = fetcher.mock.calls[1][1];
  expect(session.getToken).toHaveBeenLastCalledWith(true);
  expect(JSON.parse(options.body)).toEqual({ content: "Nuevo aviso" });
  expect(options.redirect).toBe("error");
  expect(options.credentials).toBe("omit");
});
it("no hace HTTP si no hay permisos o la sesión falla", async () => {
  const { api, session, fetcher } = setup();
  session.getToken.mockRejectedValue(new PermissionError("Sin permiso"));
  await expect(api.update("Texto")).rejects.toThrow("Sin permiso");
  expect(fetcher).not.toHaveBeenCalled();
});
it.each([401, 403, 500])(
  "muestra rechazo HTTP %i en vez de un éxito",
  async (status) => {
    const { api, session, fetcher } = setup();
    fetcher.mockResolvedValue(new Response("", { status }));
    await expect(api.update("Texto")).rejects.toThrow();
    expect(session.expire).toHaveBeenCalledTimes(status === 401 ? 1 : 0);
  },
);
it("tras actualizar con 204 vuelve a leer el mensaje persistido", async () => {
  const { api, fetcher } = setup();
  fetcher.mockResolvedValueOnce(new Response(null, { status: 204 }));
  expect(await api.update("Texto")).toEqual(message);
  expect(fetcher.mock.calls.map((call) => call[1].method)).toEqual([
    "PUT",
    "GET",
  ]);
});
it("no inventa datos ante respuestas inválidas y admite ausencia 204", async () => {
  const { api, fetcher } = setup();
  fetcher.mockResolvedValueOnce(new Response("<html>error</html>"));
  await expect(api.read()).rejects.toThrow("JSON");
  fetcher.mockResolvedValueOnce(
    new Response(JSON.stringify({ message: "otro formato" })),
  );
  await expect(api.read()).rejects.toThrow("formato");
  fetcher.mockResolvedValueOnce(new Response(null, { status: 204 }));
  expect(await api.read()).toBe(null);
});
it("rechaza mensajes vacíos o demasiado largos antes de enviar", async () => {
  expect(() => validateContent("  ")).toThrow();
  expect(() => validateContent("a".repeat(2001))).toThrow();
  const { api, fetcher } = setup();
  await expect(api.update("")).rejects.toThrow();
  expect(fetcher).not.toHaveBeenCalled();
});
it("cancela una lectura antes del envío cuando se abandona la página", async () => {
  const { api, fetcher } = setup();
  const controller = new AbortController();
  controller.abort();
  await expect(api.read(controller.signal)).rejects.toThrow();
  expect(fetcher).not.toHaveBeenCalled();
});
