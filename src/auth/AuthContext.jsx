import { createContext, useContext, useSyncExternalStore } from "react";

const AuthContext = createContext(null);
export function AuthProvider({ session, children }) {
  const state = useSyncExternalStore(session.subscribe, session.getSnapshot);
  return (
    <AuthContext.Provider value={{ ...state, session }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);

export function AccessGate({ children }) {
  const { status, session } = useAuth();
  if (status === "authenticated" || status === "public") return children;
  const messages = {
    loading: ["Conectando con tu cuenta", "Estamos comprobando tu sesión."],
    denied: [
      "Acceso no asignado",
      "Tu cuenta necesita el rol ADMIN o EMPLEADO de la intranet. Solicítalo al administrador.",
    ],
    expired: ["Tu sesión terminó", "Vuelve a iniciar sesión para continuar."],
    error: [
      "No pudimos iniciar sesión",
      "Comprueba la conexión y la configuración de Keycloak.",
    ],
  };
  const [title, message] = messages[status] || messages.error;
  return (
    <div className="access-screen">
      <section role="status">
        <span className="eyebrow">BANCO LA REFORMA</span>
        <h1>{title}</h1>
        <p>{message}</p>
        {status === "expired" && (
          <button
            className="button button-primary"
            onClick={() =>
              session.login().catch(() => window.location.reload())
            }
          >
            Iniciar sesión
          </button>
        )}
        {status === "denied" && (
          <button
            className="button button-primary"
            onClick={() =>
              session.logout().catch(() => window.location.reload())
            }
          >
            Cerrar sesión
          </button>
        )}
        {status === "error" && (
          <button
            className="button button-primary"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        )}
      </section>
    </div>
  );
}
