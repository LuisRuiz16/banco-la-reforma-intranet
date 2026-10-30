import { useEffect, useRef, useState } from "react";
import { Bell, Pencil, Check } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { MAX_MESSAGE_LENGTH, validateContent } from "./api";

export default function DailyMessage({ api }) {
  const { status, canEdit } = useAuth();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const operation = useRef(null);
  const editButton = useRef(null);
  const available = status === "authenticated" && api.configured;
  useEffect(() => {
    setEditing(false);
    setSaved(false);
    setMessage(null);
    setError("");
    if (!available) return;
    const controller = new AbortController();
    operation.current = controller;
    setLoading(true);
    api
      .read(controller.signal)
      .then((value) => {
        if (!controller.signal.aborted) setMessage(value);
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => {
      controller.abort();
      operation.current?.abort();
    };
  }, [api, available, attempt]);
  function finishEditing() {
    setEditing(false);
    requestAnimationFrame(() => editButton.current?.focus());
  }
  async function save(event) {
    event.preventDefault();
    if (saving || !canEdit) return;
    try {
      validateContent(draft);
    } catch (err) {
      setError(err.message);
      return;
    }
    setSaving(true);
    setError("");
    setSaved(false);
    const controller = new AbortController();
    operation.current = controller;
    try {
      const result = await api.update(draft, controller.signal);
      if (controller.signal.aborted) return;
      if (!result)
        throw new Error(
          "No pudimos confirmar el mensaje guardado. Vuelve a consultar.",
        );
      setMessage(result);
      setSaved(true);
      finishEditing();
    } catch (err) {
      if (!controller.signal.aborted) setError(err.message);
    } finally {
      if (!controller.signal.aborted) setSaving(false);
    }
  }
  const date = message?.updated_at ? new Date(message.updated_at) : null;
  return (
    <section
      className="daily-message"
      aria-labelledby="daily-message-title"
      aria-busy={loading || saving}
    >
      <div className="daily-heading">
        <span className="icon-tile tone-green">
          <Bell size={21} />
        </span>
        <div>
          <span className="eyebrow">COMUNICACIÓN INTERNA</span>
          <h2 id="daily-message-title">Mensaje del día</h2>
        </div>
        {available && canEdit && !loading && !error && !editing && (
          <button
            ref={editButton}
            className="button message-edit"
            onClick={() => {
              setDraft(message?.content || "");
              setEditing(true);
              setError("");
              setSaved(false);
            }}
          >
            <Pencil size={16} /> Editar mensaje
          </button>
        )}
      </div>
      {!available ? (
        <p className="message-muted">
          El mensaje del día estará disponible próximamente.
        </p>
      ) : loading ? (
        <p role="status">Consultando el mensaje…</p>
      ) : editing && canEdit ? (
        <form className="message-form" onSubmit={save}>
          <label htmlFor="daily-content">Mensaje institucional</label>
          <textarea
            id="daily-content"
            autoFocus
            value={draft}
            maxLength={MAX_MESSAGE_LENGTH}
            disabled={saving}
            onChange={(event) => setDraft(event.target.value)}
            aria-describedby="message-length"
            rows={4}
          />
          <div id="message-length" className="message-muted">
            {draft.length} / {MAX_MESSAGE_LENGTH} caracteres · Visible para todo
            el equipo
          </div>
          <div className="message-form-actions">
            <button
              className="button button-primary"
              disabled={saving || !draft.trim()}
            >
              {saving ? "Guardando…" : "Guardar mensaje"}
            </button>
            <button
              className="button"
              type="button"
              disabled={saving}
              onClick={() => {
                setError("");
                finishEditing();
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : message ? (
        <>
          <p className="message-content">{message.content}</p>
          {date && !Number.isNaN(date.getTime()) && (
            <p className="message-muted">
              Actualizado el{" "}
              {date.toLocaleString("es-GT", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          )}
        </>
      ) : (
        !error && (
          <p className="message-muted">Aún no hay un mensaje publicado.</p>
        )
      )}
      {error && (
        <div className="message-error" role="alert">
          <p>{error}</p>
          {!editing && (
            <button
              className="button"
              onClick={() => setAttempt((value) => value + 1)}
            >
              Volver a consultar
            </button>
          )}
        </div>
      )}
      {saved && (
        <p className="message-success" role="status">
          <Check size={16} /> Mensaje guardado para todo el equipo.
        </p>
      )}
    </section>
  );
}
