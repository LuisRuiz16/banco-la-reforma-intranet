export class SessionError extends Error {}
export class PermissionError extends Error {}

export function permissionsFromToken(token, config) {
  const roles =
    config.roleSource === "realm"
      ? token?.realm_access?.roles
      : token?.resource_access?.[config.roleClientId]?.roles;
  const assigned = Array.isArray(roles) ? roles : [];
  const canEdit = assigned.includes("ADMIN");
  return { canRead: canEdit || assigned.includes("EMPLEADO"), canEdit };
}

// Una instancia por arranque: React StrictMode no vuelve a inicializar Keycloak.
export function createSession(config, keycloak) {
  let state = {
    status: config.enabled ? "loading" : "public",
    canRead: false,
    canEdit: false,
    name: "",
    role: "",
  };
  let initialization;
  const listeners = new Set();
  function publish(next) {
    if (JSON.stringify(state) === JSON.stringify(next)) return;
    state = next;
    listeners.forEach((listener) => listener());
  }
  function expire() {
    publish({
      status: "expired",
      canRead: false,
      canEdit: false,
      name: "",
      role: "",
    });
    if (keycloak?.authenticated) keycloak.clearToken();
  }
  function sync() {
    if (!keycloak.authenticated || !keycloak.token) {
      expire();
      return;
    }
    const permissions = permissionsFromToken(keycloak.tokenParsed, config);
    publish({
      status: permissions.canRead ? "authenticated" : "denied",
      ...permissions,
      name:
        keycloak.tokenParsed?.name ||
        keycloak.tokenParsed?.preferred_username ||
        "Colaborador",
      role: permissions.canEdit
        ? "ADMIN"
        : permissions.canRead
          ? "EMPLEADO"
          : "",
    });
  }
  async function refresh() {
    try {
      await keycloak.updateToken(30);
      sync();
    } catch {
      expire();
      throw new SessionError("Tu sesión terminó. Vuelve a iniciar sesión.");
    }
  }
  return {
    getSnapshot: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    expire,
    start() {
      if (!config.enabled) return Promise.resolve();
      if (!initialization)
        initialization = (async () => {
          keycloak.onAuthLogout = expire;
          keycloak.onAuthRefreshError = expire;
          keycloak.onAuthRefreshSuccess = sync;
          keycloak.onTokenExpired = () => {
            refresh().catch(() => {});
          };
          try {
            await keycloak.init({
              onLoad: "login-required",
              flow: "standard",
              pkceMethod: "S256",
              checkLoginIframe: false,
              enableLogging: false,
            });
            sync();
          } catch {
            publish({
              status: "error",
              canRead: false,
              canEdit: false,
              name: "",
              role: "",
            });
          }
        })();
      return initialization;
    },
    async getToken(write = false) {
      if (state.status !== "authenticated")
        throw new SessionError("Inicia sesión para consultar el mensaje.");
      await refresh();
      if (state.status === "expired")
        throw new SessionError("Tu sesión terminó. Vuelve a iniciar sesión.");
      if (!state.canRead || (write && !state.canEdit))
        throw new PermissionError(
          "No tienes permiso para realizar esta acción.",
        );
      return keycloak.token;
    },
    login: () => keycloak.login(),
    logout: () =>
      keycloak.logout({ redirectUri: window.location.origin + "/" }),
  };
}
