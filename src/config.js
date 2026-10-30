function httpUrl(value, name, relative = false) {
  if (!value) return "";
  if (/[\u0000-\u0020\u007f\\]/.test(value))
    throw new Error(`${name}: la URL contiene caracteres no permitidos.`);
  if (
    relative &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\")
  ) {
    const parsed = new URL(value, "https://intranet.invalid");
    if (parsed.origin !== "https://intranet.invalid" || parsed.hash)
      throw new Error(
        `${name}: usa una ruta del mismo origen, sin fragmentos (#).`,
      );
    return value;
  }
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name}: escribe una URL válida.`);
  }
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.hash
  ) {
    throw new Error(
      `${name}: usa una URL HTTP(S), sin credenciales ni fragmentos.`,
    );
  }
  if (
    url.protocol === "http:" &&
    !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
  ) {
    throw new Error(
      `${name}: usa HTTPS para los servicios de la red del proyecto.`,
    );
  }
  return url.href.replace(/\/$/, "");
}

export function readConfig(env) {
  const value = (key, fallback = "") => String(env[key] ?? fallback).trim();
  const flag = value("VITE_AUTH_ENABLED", "false");
  if (!["true", "false"].includes(flag))
    throw new Error("VITE_AUTH_ENABLED debe ser true o false.");
  const enabled = flag === "true";
  const url = httpUrl(value("VITE_KEYCLOAK_URL"), "VITE_KEYCLOAK_URL");
  const realm = value("VITE_KEYCLOAK_REALM");
  const clientId = value("VITE_KEYCLOAK_CLIENT_ID", "intranet");
  const roleSource = value("VITE_KEYCLOAK_ROLE_SOURCE", "client");
  const roleClientId = value("VITE_KEYCLOAK_ROLE_CLIENT_ID") || clientId;
  if (!["client", "realm"].includes(roleSource))
    throw new Error("El origen de roles debe ser client o realm.");
  if (enabled && (!url || !realm || !clientId))
    throw new Error(
      "Completa la URL, el realm y el cliente de Keycloak en .env y reconstruye la aplicación.",
    );
  const readUrl = httpUrl(
    value("VITE_MESSAGE_READ_URL"),
    "VITE_MESSAGE_READ_URL",
    true,
  );
  const writeUrl = httpUrl(
    value("VITE_MESSAGE_WRITE_URL") || readUrl,
    "VITE_MESSAGE_WRITE_URL",
    true,
  );
  const writeMethod = value("VITE_MESSAGE_WRITE_METHOD", "PUT");
  if (!["PUT", "PATCH"].includes(writeMethod))
    throw new Error("El método de actualización debe ser PUT o PATCH.");
  return {
    auth: { enabled, url, realm, clientId, roleSource, roleClientId },
    message: { readUrl, writeUrl, writeMethod },
  };
}

export function externalOrigins(config) {
  return [
    ...new Set(
      [config.auth.url, config.message.readUrl, config.message.writeUrl]
        .filter((url) => /^https?:\/\//.test(url))
        .map((url) => new URL(url).origin),
    ),
  ];
}
