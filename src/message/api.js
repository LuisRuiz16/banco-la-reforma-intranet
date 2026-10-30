import { PermissionError, SessionError } from "../auth/session";

export const MAX_MESSAGE_LENGTH = 2000;
export function validateContent(content) {
  if (typeof content !== "string" || !content.trim())
    throw new Error("Escribe el mensaje antes de guardar.");
  if (content.trim().length > MAX_MESSAGE_LENGTH)
    throw new Error(
      `El mensaje admite hasta ${MAX_MESSAGE_LENGTH} caracteres.`,
    );
  return content.trim();
}

function parseMessage(data) {
  if (
    !data ||
    typeof data.content !== "string" ||
    typeof data.id !== "number"
  ) {
    throw new Error("La API devolvió un formato de mensaje inesperado.");
  }
  return {
    id: data.id,
    content: data.content,
    updated_at: typeof data.updated_at === "string" ? data.updated_at : null,
  };
}

export function createMessageApi(config, session, fetcher = fetch) {
  async function request(url, method, content, signal) {
    if (!url)
      throw new Error("La API del mensaje todavía no está configurada.");
    const write = method !== "GET";
    const body = write
      ? JSON.stringify({ content: validateContent(content) })
      : undefined;
    const token = await session.getToken(write);
    signal?.throwIfAborted();
    let response;
    const timeout = AbortSignal.timeout(15000);
    try {
      response = await fetcher(url, {
        method,
        signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          ...(write ? { "Content-Type": "application/json" } : {}),
        },
        body,
        credentials: "omit",
        cache: "no-store",
        redirect: "error",
      });
    } catch (error) {
      if (signal?.aborted) throw error;
      throw new Error(
        timeout.aborted
          ? "La API tardó demasiado en responder. Inténtalo otra vez."
          : "No se pudo conectar con la API del mensaje. Comprueba la red e inténtalo otra vez.",
      );
    }
    if (response.status === 401) {
      session.expire();
      throw new SessionError(
        "Tu sesión no fue aceptada por la API. Vuelve a iniciar sesión.",
      );
    }
    if (response.status === 403)
      throw new PermissionError(
        "La API no autorizó esta acción. Solicita la revisión de tus permisos.",
      );
    if (!response.ok)
      throw new Error(
        `La API no pudo completar la solicitud (HTTP ${response.status}).`,
      );
    if (response.status === 204) return null;
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("La API no devolvió un mensaje en formato JSON.");
    }
    return parseMessage(data);
  }
  const read = (signal) => request(config.readUrl, "GET", undefined, signal);
  return {
    configured: Boolean(config.readUrl),
    read,
    async update(content, signal) {
      const saved = await request(
        config.writeUrl,
        config.writeMethod,
        content,
        signal,
      );
      // Un PUT/PATCH 204 requiere leer lo que el servidor realmente guardó.
      return saved ?? (await read(signal));
    },
  };
}
