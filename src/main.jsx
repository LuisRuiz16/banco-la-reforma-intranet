import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Keycloak from "keycloak-js";
import { readConfig } from "./config";
import { createSession } from "./auth/session";
import { AuthProvider, AccessGate } from "./auth/AuthContext";
import { createMessageApi } from "./message/api";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import App from "./App.jsx";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
async function start() {
  try {
    const config = readConfig(import.meta.env);
    if (config.auth.enabled && !window.isSecureContext) {
      throw new Error(
        "Abre la intranet por HTTPS para iniciar sesión desde la red. HTTP solo se admite en localhost para desarrollo.",
      );
    }
    const keycloak = config.auth.enabled
      ? new Keycloak({
          url: config.auth.url,
          realm: config.auth.realm,
          clientId: config.auth.clientId,
        })
      : null;
    const session = createSession(config.auth, keycloak);
    root.render(
      <AuthProvider session={session}>
        <AccessGate />
      </AuthProvider>,
    );
    // Keycloak procesa el retorno OIDC antes de que el router use la URL.
    await session.start();
    const messageApi = createMessageApi(config.message, session);
    root.render(
      <React.StrictMode>
        <AuthProvider session={session}>
          <AccessGate>
            <BrowserRouter>
              <App messageApi={messageApi} />
            </BrowserRouter>
          </AccessGate>
        </AuthProvider>
      </React.StrictMode>,
    );
  } catch (error) {
    root.render(
      <div className="access-screen">
        <section role="alert">
          <span className="eyebrow">BANCO LA REFORMA</span>
          <h1>Revisa la configuración</h1>
          <p>{error.message}</p>
        </section>
      </div>,
    );
  }
}
start();
