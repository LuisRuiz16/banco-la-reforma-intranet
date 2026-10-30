import { describe, it, expect, vi } from "vitest";
import { readConfig, externalOrigins } from "../src/config";
import {
  createSession,
  permissionsFromToken,
  PermissionError,
  SessionError,
} from "../src/auth/session";

const auth = { enabled: true, roleSource: "client", roleClientId: "intranet" };
function adapter(roles = ["EMPLEADO"]) {
  return {
    authenticated: true,
    token: "test-token",
    tokenParsed: {
      preferred_username: "prueba",
      resource_access: { intranet: { roles } },
    },
    init: vi.fn().mockResolvedValue(true),
    updateToken: vi.fn().mockResolvedValue(false),
    clearToken: vi.fn(),
  };
}
describe("Configuración y permisos", () => {
  it("no concede roles al abrir la versión informativa", () => {
    expect(readConfig({}).auth.enabled).toBe(false);
    expect(createSession({ enabled: false }, null).getSnapshot().canEdit).toBe(
      false,
    );
  });
  it("falla si se habilita SSO sin sus datos o con un origen de roles desconocido", () => {
    expect(() => readConfig({ VITE_AUTH_ENABLED: "true" })).toThrow("Completa");
    expect(() => readConfig({ VITE_KEYCLOAK_ROLE_SOURCE: "both" })).toThrow();
  });
  it("rechaza URLs inseguras, credenciales y rutas que cambian de origen", () => {
    for (const url of [
      "http://servicio.example",
      "javascript:alert(1)",
      "https://user:pass@servicio.example",
      "//evil.example",
      "/\n/evil.example",
      "/\\evil.example",
    ]) {
      expect(() => readConfig({ VITE_MESSAGE_READ_URL: url })).toThrow();
    }
  });
  it("deduplica orígenes para CSP y permite desarrollo localhost", () => {
    const config = readConfig({
      VITE_KEYCLOAK_URL: "http://localhost:8080",
      VITE_MESSAGE_READ_URL: "https://api.example/message",
      VITE_MESSAGE_WRITE_URL: "https://api.example/message",
    });
    expect(externalOrigins(config)).toEqual([
      "http://localhost:8080",
      "https://api.example",
    ]);
  });
  it("no acepta ADMIN de otro cliente ni del realm cuando se selecciona client", () => {
    const token = {
      resource_access: {
        tickets: { roles: ["ADMIN"] },
        intranet: { roles: ["EMPLEADO"] },
      },
      realm_access: { roles: ["ADMIN"] },
    };
    expect(permissionsFromToken(token, auth)).toEqual({
      canRead: true,
      canEdit: false,
    });
    expect(
      permissionsFromToken(token, { ...auth, roleSource: "realm" }).canEdit,
    ).toBe(true);
    expect(permissionsFromToken({}, auth)).toEqual({
      canRead: false,
      canEdit: false,
    });
  });
});
describe("Sesión Keycloak", () => {
  it("inicializa solo una vez y usa login obligatorio y PKCE", async () => {
    const kc = adapter();
    const session = createSession(auth, kc);
    await Promise.all([session.start(), session.start()]);
    expect(kc.init).toHaveBeenCalledTimes(1);
    expect(kc.init).toHaveBeenCalledWith(
      expect.objectContaining({
        onLoad: "login-required",
        pkceMethod: "S256",
        flow: "standard",
      }),
    );
  });
  it("renueva antes de autorizar y rechaza escritura de EMPLEADO", async () => {
    const kc = adapter();
    const session = createSession(auth, kc);
    await session.start();
    await expect(session.getToken(true)).rejects.toBeInstanceOf(
      PermissionError,
    );
    expect(kc.updateToken).toHaveBeenCalledWith(30);
  });
  it("detecta el retiro del rol ADMIN después de renovar", async () => {
    const kc = adapter(["ADMIN"]);
    const session = createSession(auth, kc);
    await session.start();
    kc.updateToken.mockImplementation(async () => {
      kc.tokenParsed.resource_access.intranet.roles = ["EMPLEADO"];
    });
    await expect(session.getToken(true)).rejects.toBeInstanceOf(
      PermissionError,
    );
    expect(session.getSnapshot().canEdit).toBe(false);
  });
  it("expira sesión al fallar refresh y no entrega token", async () => {
    const kc = adapter(["ADMIN"]);
    const session = createSession(auth, kc);
    await session.start();
    kc.updateToken.mockRejectedValue(new Error("offline"));
    await expect(session.getToken(true)).rejects.toBeInstanceOf(SessionError);
    expect(session.getSnapshot().status).toBe("expired");
    expect(kc.clearToken).toHaveBeenCalled();
  });
  it("cierra el acceso si Keycloak falla o el usuario no tiene roles", async () => {
    const kc = adapter([]);
    const session = createSession(auth, kc);
    await session.start();
    expect(session.getSnapshot().status).toBe("denied");
    const bad = adapter();
    bad.init.mockRejectedValue(new Error("unavailable"));
    const failed = createSession(auth, bad);
    await failed.start();
    expect(failed.getSnapshot().status).toBe("error");
  });
});
