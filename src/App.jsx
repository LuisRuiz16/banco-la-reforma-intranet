import { useEffect, useRef, useState } from "react";
import { useAuth } from "./auth/AuthContext";
import DailyMessage from "./message/DailyMessage";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Bookmark,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Copy,
  FileText,
  FolderOpen,
  Headphones,
  HeartHandshake,
  House,
  Landmark,
  Layers3,
  LifeBuoy,
  MapPin,
  Menu,
  Monitor,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  bank,
  departments,
  documents,
  events,
  faqs,
  formatDate,
  news,
  normalize,
} from "./data/content";

const iconMap = {
  landmark: Landmark,
  users: Users,
  monitor: Monitor,
  layers: Layers3,
  shield: ShieldCheck,
  book: BookOpen,
  headphones: Headphones,
  folder: FolderOpen,
  check: Check,
};
const navigation = [
  { to: "/", label: "Inicio", icon: House },
  { to: "/nuestro-banco", label: "Nuestro banco", icon: Landmark },
  { to: "/comunicados", label: "Comunicados", icon: Bell },
  { to: "/documentos", label: "Documentos", icon: FolderOpen },
  { to: "/directorio", label: "Directorio", icon: Users },
  { to: "/departamentos", label: "Departamentos", icon: Layers3 },
];

function BrandMark({ small = false }) {
  return (
    <svg
      viewBox="0 0 44 44"
      width={small ? 30 : 42}
      height={small ? 30 : 42}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 16 22 5l17 11M5 38h34M10 20v12m12-12v12m12-12v12"
        stroke="currentColor"
        strokeWidth="3.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BankArt({ id = "hero" }) {
  return (
    <svg
      className="bank-art"
      viewBox="0 0 540 300"
      role="img"
      aria-label="Ilustración de la sede de Banco La Reforma"
    >
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#eaf0d9" />
          <stop offset="1" stopColor="#c9d5bf" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#698a77" />
          <stop offset="1" stopColor="#a8bd9d" />
        </linearGradient>
      </defs>
      <circle cx="375" cy="112" r="96" fill="#d2e2c9" />
      <circle cx="412" cy="55" r="30" fill="#f2e4b7" />
      <path
        d="M20 262c116-17 329-17 500 0"
        fill="none"
        stroke="#becfb8"
        strokeWidth="1.5"
      />
      <ellipse cx="284" cy="261" rx="180" ry="17" fill="#ccdac6" />
      <path d="m108 249 230 17 132-45-230-12z" fill="#c2d0bb" />
      <path d="M150 116 335 91l91 46-186 27z" fill="#f4f1de" />
      <path d="M150 116v118l185 24V91z" fill={`url(#${id}-wall)`} />
      <path d="M335 91v167l91-37v-84z" fill="#b1c3a9" />
      <path d="M139 114 332 84l106 50-12 8-92-42-184 28z" fill="#f8f5e9" />
      <path d="m162 147 162-12v12l-162 9z" fill="#224e40" />
      <g fill={`url(#${id}-glass)`}>
        <path d="m167 166 37-1v61l-37-5z" />
        <path d="m217 165 39-1v70l-39-6z" />
        <path d="m270 164 39-1v78l-39-5z" />
        <path d="m351 151 23-8v90l-23 9z" />
        <path d="m386 139 23-7v88l-23 9z" />
      </g>
      <g stroke="#c7d6bd" strokeWidth="2">
        <path d="M185 165v59m51-60v67m54-67v74m-123-45 37 1m13 0 39 1m14 0 39 1m53-49v91m35-103v90" />
      </g>
      <path d="m150 234 185 24 91-37v7l-91 38-185-24z" fill="#eef0df" />
      <path
        d="m250 244 66 9-16 6-67-9zM239 252l64 9-15 6-65-8z"
        fill="#9fb297"
      />
      <path
        d="M228 133v-12m-8 10v-9m16 8v-9m-20-4 12-9 12 5m-25 22 27-2"
        stroke="#345d4b"
        strokeWidth="2.5"
        fill="none"
      />
      <g>
        <path d="M102 247V183" stroke="#597657" strokeWidth="5" />
        <ellipse cx="102" cy="168" rx="29" ry="48" fill="#729367" />
        <path
          d="M102 215v-65m0 34-14-15m14 29 16-17"
          stroke="#a4bd8e"
          strokeWidth="2"
        />
      </g>
      <g>
        <path d="M463 237v-66" stroke="#587654" strokeWidth="4" />
        <ellipse cx="463" cy="158" rx="24" ry="39" fill="#8aa476" />
        <path d="M463 197v-60m0 35 12-13" stroke="#bacb9d" strokeWidth="2" />
      </g>
      <path d="m121 247 8-16 13 2 7 18m279-17 12-19 15 0 8 10" fill="#466e50" />
      <path
        d="M69 260h39m340-12h40"
        stroke="#9db58d"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m365 30 5-3 5 3m-57 29 5-3 5 3"
        stroke="#91aa83"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

function StoryVisual({ type, id }) {
  if (type === "building")
    return (
      <div className="story-visual visual-building">
        <span className="visual-label">CONECTADOS, CRECEMOS.</span>
        <BankArt id={id} />
      </div>
    );
  if (type === "security")
    return (
      <div className="story-visual visual-security">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="security-symbol">
          <ShieldCheck size={65} strokeWidth={1.25} />
        </div>
        <span className="mini-lock lock-one">
          <Check size={14} />
        </span>
        <span className="mini-lock lock-two">
          <ShieldCheck size={20} />
        </span>
        <span className="visual-label">CUIDARNOS ES TAREA DE TODOS.</span>
      </div>
    );
  return (
    <div className={`story-visual visual-${type}`}>
      <div className="story-symbol">
        {type === "people" ? (
          <HeartHandshake size={76} strokeWidth={1.15} />
        ) : (
          <FolderOpen size={76} strokeWidth={1.15} />
        )}
      </div>
      <span className="visual-label">
        {type === "people"
          ? "PERSONAS QUE HACEN LA DIFERENCIA."
          : "INFORMACIÓN QUE NOS CONECTA."}
      </span>
    </div>
  );
}

function Modal({ title, children, onClose, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      className={`modal ${wide ? "modal-wide" : ""}`}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-heading">
        <span className="eyebrow">BANCO LA REFORMA</span>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Cerrar ventana"
        >
          <X size={21} />
        </button>
      </div>
      <h2>{title}</h2>
      {children}
    </dialog>
  );
}

function PageHeading({ eyebrow, title, description, children }) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 tabIndex={-1}>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {children}
    </div>
  );
}

function EmptyState({ title, message, children }) {
  return (
    <div className="empty-state">
      <Search size={32} strokeWidth={1.4} />
      <h3>{title}</h3>
      <p>{message}</p>
      {children}
    </div>
  );
}

function NewsCard({ item, onOpen }) {
  return (
    <article className="news-card">
      <button
        className="story-image-button"
        onClick={() => onOpen(item)}
        aria-label={`Leer: ${item.title}`}
      >
        <StoryVisual type={item.visual} id={item.id} />
      </button>
      <div className="news-body">
        <div className="meta">
          <span
            className={`tag ${item.category === "Tecnología" ? "tag-blue" : ""}`}
          >
            {item.category}
          </span>
          <time dateTime={item.date}>
            {formatDate(item.date, { day: "numeric", month: "short" })}
          </time>
        </div>
        <h3>
          <button className="text-button" onClick={() => onOpen(item)}>
            {item.title}
          </button>
        </h3>
        <p>{item.excerpt}</p>
        <button className="read-link" onClick={() => onOpen(item)}>
          Leer comunicado <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}

function Home({ openNews, openEvent, messageApi }) {
  const shortcuts = [
    {
      title: "Documentos",
      text: "Guías y recursos",
      icon: FolderOpen,
      to: "/documentos",
      tone: "green",
    },
    {
      title: "Directorio",
      text: "Encuentra a tu equipo",
      icon: Users,
      to: "/directorio",
      tone: "peach",
    },
    {
      title: "Soporte técnico",
      text: "Estamos para ayudarte",
      icon: Headphones,
      to: "/ayuda",
      tone: "blue",
    },
    {
      title: "Nuestros equipos",
      text: "Conoce cada área",
      icon: Layers3,
      to: "/departamentos",
      tone: "gold",
    },
  ];
  return (
    <>
      <div className="welcome-line">
        <span>
          <span className="status-dot" /> TU ESPACIO DE CONEXIÓN
        </span>
        <span>
          <MapPin size={14} /> Ciudad de Guatemala
        </span>
      </div>
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-pill">
            <Sparkles size={13} /> Bienvenido a nuestra intranet
          </span>
          <h1>
            Un mismo banco.
            <br />
            Un equipo <em>conectado.</em>
          </h1>
          <p>
            La información, las personas y los recursos que necesitas para hacer
            mejor tu día.
          </p>
          <Link className="button button-primary" to="/nuestro-banco">
            Conoce nuestro banco <ArrowRight size={17} />
          </Link>
        </div>
        <div className="hero-art">
          <BankArt />
          <div className="art-caption">
            <span className="status-dot" /> NUESTRA SEDE · GUATEMALA
          </div>
        </div>
      </section>
      <DailyMessage api={messageApi} />
      <div className="section-heading compact">
        <h2>Tu día, más sencillo</h2>
        <span>Accesos rápidos</span>
      </div>
      <section className="quick-grid" aria-label="Accesos rápidos">
        {shortcuts.map(({ title, text, icon: Icon, to, tone }) => (
          <Link className="quick-card" to={to} key={to}>
            <span className={`icon-tile tone-${tone}`}>
              <Icon size={21} strokeWidth={1.7} />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <ArrowUpRight className="quick-arrow" size={16} />
          </Link>
        ))}
      </section>
      <div className="home-columns">
        <section>
          <div className="section-heading">
            <div>
              <span className="eyebrow">LO QUE NOS CONECTA</span>
              <h2>Al día en La Reforma</h2>
            </div>
            <Link className="text-link" to="/comunicados">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
          <div className="news-grid home-news">
            {news
              .filter((item) => item.featured)
              .map((item) => (
                <NewsCard item={item} key={item.id} onOpen={openNews} />
              ))}
          </div>
        </section>
        <aside className="home-aside">
          <section className="agenda-panel">
            <div className="section-heading">
              <h2>En agenda</h2>
              <CalendarDays size={20} />
            </div>
            <p className="small-muted">Espacios para aprender y compartir</p>
            <div className="agenda-list">
              {events.map((event) => (
                <button
                  className="event-row"
                  key={event.id}
                  onClick={() => openEvent(event)}
                >
                  <span className="date-tile">
                    <strong>{event.day}</strong>
                    <span>{event.month}</span>
                  </span>
                  <span className="event-copy">
                    <strong>{event.title}</strong>
                    <span>
                      <Clock3 size={12} />
                      {event.time}
                    </span>
                  </span>
                  <ChevronRight size={15} />
                </button>
              ))}
            </div>
            <div className="sample-note">Agenda de ejemplo · Octubre 2026</div>
          </section>
          <section className="team-note">
            <span className="mini-avatars">
              <i>GG</i>
              <i>RH</i>
              <i>TI</i>
              <i>+2</i>
            </span>
            <h3>Cinco áreas. Un mismo propósito.</h3>
            <p>
              Detrás de cada buen resultado hay un equipo que lo hace posible.
            </p>
            <Link className="text-link" to="/departamentos">
              Conoce a nuestros equipos <ArrowRight size={16} />
            </Link>
          </section>
        </aside>
      </div>
      <section className="bottom-banner">
        <span className="icon-tile">
          <HeartHandshake size={22} />
        </span>
        <div>
          <h3>La colaboración comienza con buena información.</h3>
          <p>
            Consulta los recursos y encuentra el área que puede acompañarte.
          </p>
        </div>
        <Link to="/documentos" className="text-link">
          Explorar recursos <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <PageHeading
        eyebrow="NUESTRA IDENTIDAD"
        title="Somos Banco La Reforma"
        description="Conoce la organización que nos une y el propósito de este espacio."
      />
      <section className="about-hero">
        <div>
          <span className="tag">
            Organización ficticia · Proyecto académico
          </span>
          <h2>
            Cercanos a las personas.
            <br />
            Conectados como equipo.
          </h2>
          <p>{bank.description}</p>
          <div className="location-line">
            <MapPin size={17} />
            {bank.location} · Sede única
          </div>
        </div>
        <BankArt id="about" />
      </section>
      <div className="about-facts">
        <div>
          <strong>01</strong>
          <span>Sede en Guatemala</span>
        </div>
        <div>
          <strong>05</strong>
          <span>Áreas trabajando juntas</span>
        </div>
        <div>
          <strong>Un propósito</strong>
          <span>{bank.purpose}</span>
        </div>
      </div>
      <div className="two-column">
        <section className="surface prose">
          <span className="eyebrow">EL PUNTO DE PARTIDA</span>
          <h2>Información más accesible</h2>
          <p>
            El crecimiento del banco hace necesario organizar la información que
            utilizan nuestros colaboradores. Los documentos dispersos, las
            copias desactualizadas y la búsqueda entre diferentes canales
            dificultan el trabajo diario.
          </p>
          <p>
            La intranet propone un lugar común para consultar información
            institucional, comunicados y recursos, y para encontrar a cada área.
          </p>
        </section>
        <section className="surface prose">
          <span className="eyebrow">LO QUE NOS GUÍA</span>
          <h2>Una forma de trabajar juntos</h2>
          <ul className="value-list">
            <li>
              <HeartHandshake size={20} />
              <div>
                <strong>Colaboración</strong>
                <p>Facilitar el contacto entre las áreas.</p>
              </div>
            </li>
            <li>
              <BookOpen size={20} />
              <div>
                <strong>Claridad</strong>
                <p>Organizar y comunicar la información útil.</p>
              </div>
            </li>
            <li>
              <ShieldCheck size={20} />
              <div>
                <strong>Responsabilidad</strong>
                <p>Cuidar la información y sus canales de uso.</p>
              </div>
            </li>
          </ul>
          <small className="small-muted">
            Principios propuestos para esta demostración.
          </small>
        </section>
      </div>
      <section className="scope-note">
        <ShieldCheck size={23} />
        <div>
          <h3>Una intranet para nuestros colaboradores</h3>
          <p>
            Este portal es informativo. No realiza transacciones, no ofrece
            banca en línea y no contiene información real de clientes.
          </p>
        </div>
      </section>
    </>
  );
}

function NewsPage({ openNews }) {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const categories = ["Todos", ...new Set(news.map((item) => item.category))];
  const items = news.filter(
    (item) =>
      (category === "Todos" || item.category === category) &&
      normalize(`${item.title} ${item.excerpt} ${item.department}`).includes(
        normalize(query),
      ),
  );
  return (
    <>
      <PageHeading
        eyebrow="LA INFORMACIÓN NOS ACERCA"
        title="Comunicados"
        description="Novedades, recomendaciones y mensajes de nuestros equipos."
      />
      <div className="filter-bar">
        <div className="filter-tabs" aria-label="Categorías de comunicados">
          {categories.map((value) => (
            <button
              aria-pressed={category === value}
              className={category === value ? "active" : ""}
              key={value}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <label className="inline-search">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar comunicado…"
            aria-label="Buscar comunicado"
          />
        </label>
      </div>
      <p className="results-count">
        {items.length} comunicado{items.length !== 1 && "s"} · Contenido de
        demostración
      </p>
      {items.length ? (
        <div className="news-grid full-news">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} onOpen={openNews} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No encontramos comunicados"
          message="Prueba otra palabra o selecciona una categoría diferente."
        >
          <button
            className="button button-secondary"
            onClick={() => {
              setQuery("");
              setCategory("Todos");
            }}
          >
            Limpiar filtros
          </button>
        </EmptyState>
      )}
    </>
  );
}

function downloadDocument(doc) {
  const text = `${doc.title.toUpperCase()}\nBanco La Reforma · Proyecto académico\nMaterial de ejemplo. No es una política oficial.\nÁrea: ${doc.category} | Versión: ${doc.version} | Fecha: ${doc.date}\n\n${doc.sections.map((section) => `${section.title}\n${section.text}`).join("\n\n")}\n`;
  const blob = new Blob(["\uFEFF", text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `La-Reforma-${doc.id}-v${doc.version}.txt`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function DocumentsPage({ openDocument, favorites, toggleFavorite }) {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const items = documents.filter(
    (doc) =>
      (category === "Todos" || doc.category === category) &&
      (!onlyFavorites || favorites.includes(doc.id)) &&
      normalize(`${doc.title} ${doc.description} ${doc.category}`).includes(
        normalize(query),
      ),
  );
  return (
    <>
      <PageHeading
        eyebrow="TU BIBLIOTECA DE CONSULTA"
        title="Documentos y recursos"
        description="Guías claras, organizadas por área y siempre a mano."
      >
        <div className="heading-counter">
          <FolderOpen size={22} />
          <strong>{documents.length}</strong>
          <span>recursos disponibles</span>
        </div>
      </PageHeading>
      <div className="resource-notice">
        <BookOpen size={19} />
        <p>
          Guías de ejemplo para el proyecto académico. Puedes leerlas aquí o
          descargarlas en formato de texto <strong>(.txt)</strong>.
        </p>
      </div>
      <div className="document-toolbar">
        <label className="inline-search">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar en documentos…"
            aria-label="Buscar en documentos"
          />
        </label>
        <label className="select-label">
          <span>Área</span>
          <select
            aria-label="Filtrar documentos por área"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {["Todos", ...new Set(documents.map((doc) => doc.category))].map(
              (value) => (
                <option key={value}>{value}</option>
              ),
            )}
          </select>
          <ChevronDown size={15} />
        </label>
        <button
          className={`favorite-filter ${onlyFavorites ? "selected" : ""}`}
          aria-pressed={onlyFavorites}
          onClick={() => setOnlyFavorites(!onlyFavorites)}
        >
          <Bookmark size={16} /> Mis favoritos <span>{favorites.length}</span>
        </button>
      </div>
      <p className="results-count">
        {items.length} recurso{items.length !== 1 && "s"} encontrado
        {items.length !== 1 && "s"}
      </p>
      {items.length ? (
        <div className="document-grid">
          {items.map((doc) => {
            const Icon = iconMap[doc.icon];
            const saved = favorites.includes(doc.id);
            return (
              <article className="document-card" key={doc.id}>
                <div className="document-top">
                  <span className="icon-tile tone-green">
                    <Icon size={23} />
                  </span>
                  <button
                    className={`icon-button bookmark-button ${saved ? "saved" : ""}`}
                    aria-label={`${saved ? "Quitar" : "Guardar"} ${doc.title} ${saved ? "de" : "en"} favoritos`}
                    aria-pressed={saved}
                    onClick={() => toggleFavorite(doc.id)}
                  >
                    <Bookmark
                      size={19}
                      fill={saved ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <span className="small-label">{doc.category}</span>
                <h2>
                  <button
                    className="text-button"
                    onClick={() => openDocument(doc)}
                  >
                    {doc.title}
                  </button>
                </h2>
                <p>{doc.description}</p>
                <div className="document-meta">
                  <span>TXT · v{doc.version}</span>
                  <time dateTime={doc.date}>{formatDate(doc.date)}</time>
                </div>
                <div className="document-actions">
                  <button
                    className="text-link"
                    onClick={() => openDocument(doc)}
                  >
                    Ver documento <ArrowRight size={15} />
                  </button>
                  <button
                    className="download-button"
                    onClick={() => downloadDocument(doc)}
                    aria-label={`Descargar ${doc.title} en TXT`}
                    title="Descargar TXT"
                  >
                    <ArrowDownToLine size={17} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={
            onlyFavorites
              ? "No hay favoritos con estos filtros"
              : "No encontramos documentos"
          }
          message="Puedes cambiar la búsqueda o guardar una guía con el icono de marcador."
        >
          <button
            className="button button-secondary"
            onClick={() => {
              setQuery("");
              setCategory("Todos");
              setOnlyFavorites(false);
            }}
          >
            Ver todos los documentos
          </button>
        </EmptyState>
      )}
      <p className="local-note">
        <Bookmark size={14} /> Tus favoritos se guardan solo en este navegador.
      </p>
    </>
  );
}

function DepartmentsPage() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash)
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [location.hash]);
  return (
    <>
      <PageHeading
        eyebrow="PERSONAS QUE NOS MUEVEN"
        title="Nuestros departamentos"
        description="Cinco áreas que conectan su experiencia para trabajar con un mismo propósito."
      />
      <div className="department-grid">
        {departments.map((department, index) => {
          const Icon = iconMap[department.icon];
          return (
            <article
              className="department-card"
              id={department.id}
              key={department.id}
            >
              <div className="department-top">
                <span className={`icon-tile tone-${department.color}`}>
                  <Icon size={25} strokeWidth={1.6} />
                </span>
                <span className="department-number">0{index + 1}</span>
              </div>
              <h2>{department.name}</h2>
              <p>{department.description}</p>
              <ul>
                {department.tasks.map((task) => (
                  <li key={task}>
                    <Check size={14} />
                    {task}
                  </li>
                ))}
              </ul>
              <Link
                className="text-link"
                to={`/directorio?area=${department.id}`}
              >
                Ver perfiles del área <ArrowRight size={16} />
              </Link>
            </article>
          );
        })}
        <section className="department-callout">
          <HeartHandshake size={45} strokeWidth={1.25} />
          <h2>
            El trabajo en equipo
            <br />
            nos lleva más lejos.
          </h2>
          <p>
            Encuentra el área que necesitas y conoce cómo participa en nuestra
            organización.
          </p>
          <Link className="button button-secondary" to="/directorio">
            Ir al directorio <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </>
  );
}

function DirectoryPage({ notify }) {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const area = params.get("area") || "todos";
  const filtered = departments.filter(
    (department) =>
      (area === "todos" || department.id === area) &&
      normalize(`${department.name} ${department.roles.join(" ")}`).includes(
        normalize(query),
      ),
  );
  async function copy(value) {
    try {
      await navigator.clipboard.writeText(value);
      notify("Dirección de ejemplo copiada.");
    } catch {
      notify(
        "No se pudo copiar. Selecciona la dirección y cópiala manualmente.",
      );
    }
  }
  return (
    <>
      <PageHeading
        eyebrow="ENCUENTRA A TU EQUIPO"
        title="Directorio de áreas"
        description="Conoce los perfiles y responsabilidades de cada departamento."
      />
      <div className="resource-notice">
        <Users size={19} />
        <p>
          Los perfiles corresponden a la propuesta del banco. Los correos y las
          extensiones son <strong>ejemplos sin servicio real</strong>.
        </p>
      </div>
      <div className="document-toolbar">
        <label className="inline-search">
          <Search size={18} />
          <input
            aria-label="Buscar área o perfil"
            placeholder="Buscar área o perfil…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="select-label">
          <span>Área</span>
          <select
            aria-label="Filtrar directorio por área"
            value={area}
            onChange={(event) =>
              setParams(
                event.target.value === "todos"
                  ? {}
                  : { area: event.target.value },
              )
            }
          >
            <option value="todos">Todas las áreas</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
          <ChevronDown size={15} />
        </label>
      </div>
      <div className="directory-list">
        {filtered.map((department) => (
          <article className="directory-card" key={department.id}>
            <div className={`department-avatar tone-${department.color}`}>
              {department.initials}
            </div>
            <div className="directory-main">
              <h2>{department.name}</h2>
              <div className="role-pills">
                {department.roles.map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </div>
              <Link
                className="text-link"
                to={`/departamentos#${department.id}`}
              >
                Conocer el área <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="directory-contact">
              <span className="small-label">CONTACTO DE EJEMPLO</span>
              <div className="copy-row">
                <span>{department.email}</span>
                <button
                  className="icon-button"
                  onClick={() => copy(department.email)}
                  aria-label={`Copiar correo de ejemplo de ${department.name}`}
                >
                  <Copy size={15} />
                </button>
              </div>
              <p>Extensión {department.extension} · Sede central</p>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <EmptyState
          title="No encontramos perfiles"
          message="Intenta buscar otra área o un cargo diferente."
        >
          <button
            className="button button-secondary"
            onClick={() => {
              setQuery("");
              setParams({});
            }}
          >
            Restablecer búsqueda
          </button>
        </EmptyState>
      )}
    </>
  );
}

function HelpPage({ openDocument }) {
  const configuredUrl = import.meta.env.VITE_HELPDESK_URL || "";
  let helpdeskUrl = "";
  try {
    const parsed = new URL(configuredUrl);
    if (["http:", "https:"].includes(parsed.protocol))
      helpdeskUrl = parsed.href;
  } catch {
    /* Sin URL: mostrar únicamente la guía. */
  }
  return (
    <>
      <PageHeading
        eyebrow="ESTAMOS PARA ACOMPAÑARTE"
        title="¿Cómo podemos ayudarte?"
        description="Encuentra respuestas y prepara tu solicitud de soporte."
      />
      <section className="help-hero">
        <span className="help-illustration">
          <Headphones size={64} strokeWidth={1.25} />
        </span>
        <div>
          <span className="eyebrow">SOPORTE TÉCNICO</span>
          <h2>Una buena descripción es el primer paso.</h2>
          <p>
            Anota qué ocurrió, el equipo o aplicación y el mensaje de error. Una
            captura puede ayudar; recuerda ocultar cualquier información
            sensible.
          </p>
          {helpdeskUrl ? (
            <a
              className="button button-primary"
              href={helpdeskUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir mesa de servicios <ArrowUpRight size={17} />
            </a>
          ) : (
            <button
              className="button button-primary"
              onClick={() =>
                openDocument(documents.find((doc) => doc.id === "soporte"))
              }
            >
              Ver guía de soporte <ArrowRight size={17} />
            </button>
          )}
          <span className="integration-note">
            {helpdeskUrl
              ? "La mesa de servicios se abre en una pestaña nueva."
              : "La mesa de servicios aún no está integrada. Aquí no se envían tickets."}
          </span>
        </div>
      </section>
      <section className="faq-section">
        <div>
          <span className="eyebrow">RESPUESTAS A MANO</span>
          <h2>Preguntas frecuentes</h2>
          <p className="small-muted">Todo lo que necesitas para empezar.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <ChevronDown size={18} />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

function SearchPage({ openNews, openDocument }) {
  const [params] = useSearchParams();
  const query = (params.get("q") || "").trim();
  const term = normalize(query);
  const matches = !term
    ? []
    : [
        ...news
          .filter((item) =>
            normalize(
              `${item.title} ${item.excerpt} ${item.body.join(" ")}`,
            ).includes(term),
          )
          .map((item) => ({
            key: `news-${item.id}`,
            type: "Comunicado",
            title: item.title,
            description: item.excerpt,
            icon: Bell,
            open: () => openNews(item),
          })),
        ...documents
          .filter((item) =>
            normalize(
              `${item.title} ${item.description} ${item.category} ${item.sections.map((section) => section.text).join(" ")}`,
            ).includes(term),
          )
          .map((item) => ({
            key: `doc-${item.id}`,
            type: "Documento",
            title: item.title,
            description: item.description,
            icon: FileText,
            open: () => openDocument(item),
          })),
        ...departments
          .filter((item) =>
            normalize(
              `${item.name} ${item.description} ${item.roles.join(" ")}`,
            ).includes(term),
          )
          .map((item) => ({
            key: item.id,
            type: "Departamento",
            title: item.name,
            description: item.description,
            icon: Users,
            to: `/departamentos#${item.id}`,
          })),
      ];
  return (
    <>
      <PageHeading
        eyebrow="ENCUENTRA LO QUE NECESITAS"
        title="Resultados de búsqueda"
        description={
          query
            ? `Buscaste «${query}» · ${matches.length} resultado${matches.length !== 1 ? "s" : ""}`
            : "Escribe una palabra en el buscador de la barra superior."
        }
      />
      {matches.length ? (
        <div className="search-results">
          {matches.map((result) => {
            const Icon = result.icon;
            const contents = (
              <>
                <span className="icon-tile tone-green">
                  <Icon size={21} />
                </span>
                <span className="search-result-copy">
                  <span className="small-label">{result.type}</span>
                  <strong>{result.title}</strong>
                  <span>{result.description}</span>
                </span>
                <ArrowUpRight size={19} />
              </>
            );
            return result.to ? (
              <Link className="search-result" key={result.key} to={result.to}>
                {contents}
              </Link>
            ) : (
              <button
                className="search-result"
                key={result.key}
                onClick={result.open}
              >
                {contents}
              </button>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={
            query
              ? "No encontramos coincidencias"
              : "Tu siguiente recurso está a una búsqueda"
          }
          message="Puedes buscar «seguridad», «bienvenida», «Tecnología» o el nombre de un área."
        >
          <Link className="button button-secondary" to="/documentos">
            Explorar documentos <ArrowRight size={16} />
          </Link>
        </EmptyState>
      )}
    </>
  );
}

function App({ messageApi }) {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try {
      const value = JSON.parse(
        localStorage.getItem("reforma-favorites") || "[]",
      );
      return Array.isArray(value)
        ? value.filter((id) => documents.some((doc) => doc.id === id))
        : [];
    } catch {
      return [];
    }
  });
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage =
    navigation.find((item) => item.to === location.pathname)?.label ||
    (location.pathname === "/ayuda"
      ? "Centro de ayuda"
      : location.pathname === "/buscar"
        ? "Búsqueda"
        : "Intranet");
  useEffect(() => {
    setMenuOpen(false);
    if (!location.hash) window.scrollTo(0, 0);
    document.title = `${currentPage} · La Reforma`;
  }, [location.pathname, location.hash, currentPage]);
  useEffect(() => {
    setSearch(
      location.pathname === "/buscar"
        ? new URLSearchParams(location.search).get("q") || ""
        : "",
    );
  }, [location.pathname, location.search]);
  useEffect(() => {
    const handler = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(timeout);
  }, [toast]);
  function toggleFavorite(id) {
    const next = favorites.includes(id)
      ? favorites.filter((value) => value !== id)
      : [...favorites, id];
    setFavorites(next);
    try {
      localStorage.setItem("reforma-favorites", JSON.stringify(next));
    } catch {
      setToast(
        "El navegador no permite guardar favoritos de forma permanente.",
      );
    }
  }
  const openNews = (item) => setModal({ type: "news", data: item });
  const openDocument = (item) => setModal({ type: "document", data: item });
  const today = new Intl.DateTimeFormat("es-GT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      {menuOpen && (
        <button
          className="sidebar-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
        />
      )}
      <aside className={`sidebar ${menuOpen ? "is-open" : ""}`}>
        <Link className="brand" to="/" aria-label="Banco La Reforma, inicio">
          <BrandMark />
          <span>
            <small>BANCO</small>
            <strong>LA REFORMA</strong>
          </span>
        </Link>
        <div className="sidebar-caption">INTRANET CORPORATIVA</div>
        <div className="nav-label">MI ESPACIO</div>
        <nav aria-label="Navegación principal">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink end={to === "/"} key={to} to={to}>
              <Icon size={19} strokeWidth={1.7} />
              <span>{label}</span>
              {to === "/comunicados" && (
                <span className="nav-count">{news.length}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-message">
            <span className="sidebar-spark">
              <Sparkles size={20} />
            </span>
            <h3>
              Mejor conectados,
              <br />
              mejor informados.
            </h3>
            <p>
              Este espacio también
              <br />
              es parte de tu equipo.
            </p>
          </div>
          <NavLink className="help-nav" to="/ayuda">
            <LifeBuoy size={19} /> Centro de ayuda <ArrowUpRight size={15} />
          </NavLink>
          <div className="sidebar-footer">
            <span className="status-dot" /> Proyecto académico
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="icon-button menu-button"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={22} />
            </button>
            <span>Mi intranet</span>
            <ChevronRight size={13} />
            <strong>{currentPage}</strong>
          </div>
          <form
            className="global-search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              navigate(`/buscar?q=${encodeURIComponent(search.trim())}`);
            }}
          >
            <Search size={18} />
            <input
              ref={inputRef}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="¿Qué estás buscando?"
              aria-label="Buscar en la intranet"
            />
            <button type="submit" className="search-key" title="Buscar">
              ↵
            </button>
          </form>
          <div className="header-actions">
            <button
              className="icon-button notification-button"
              aria-label="Ver comunicados recientes"
              onClick={() => setModal({ type: "notifications" })}
            >
              <Bell size={20} />
              <span />
            </button>
            <div className="header-divider" />
            <div className="profile-avatar">LR</div>
            <div className="profile-copy">
              <strong>
                {auth.name ? `Hola, ${auth.name}` : "Hola, equipo"}
              </strong>
              <span>{auth.role || "Banco La Reforma"}</span>
            </div>
            {auth.status === "authenticated" && (
              <button
                className="button logout-button"
                onClick={() =>
                  auth.session
                    .logout()
                    .catch(() =>
                      setToast(
                        "No se pudo cerrar sesión. Comprueba tu conexión e inténtalo otra vez.",
                      ),
                    )
                }
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </header>
        <main id="contenido" className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  messageApi={messageApi}
                  openNews={openNews}
                  openEvent={(event) =>
                    setModal({ type: "event", data: event })
                  }
                />
              }
            />
            <Route path="/nuestro-banco" element={<About />} />
            <Route
              path="/comunicados"
              element={<NewsPage openNews={openNews} />}
            />
            <Route
              path="/documentos"
              element={
                <DocumentsPage
                  openDocument={openDocument}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/directorio"
              element={<DirectoryPage notify={setToast} />}
            />
            <Route path="/departamentos" element={<DepartmentsPage />} />
            <Route
              path="/ayuda"
              element={<HelpPage openDocument={openDocument} />}
            />
            <Route
              path="/buscar"
              element={
                <SearchPage openNews={openNews} openDocument={openDocument} />
              }
            />
            <Route
              path="*"
              element={
                <EmptyState
                  title="Esta página no está disponible"
                  message="Puedes volver al inicio para encontrar los recursos del banco."
                >
                  <Link className="button button-primary" to="/">
                    Volver al inicio
                  </Link>
                </EmptyState>
              }
            />
          </Routes>
        </main>
        <footer className="footer">
          <span>
            <BrandMark small /> Banco La Reforma <i>·</i> Juntos, mejor
            conectados.
          </span>
          <span>Proyecto académico · Contenido demostrativo</span>
          <time>{today}</time>
        </footer>
      </div>
      {modal && (
        <Modal
          title={
            modal.type === "notifications"
              ? "Comunicados recientes"
              : modal.data.title
          }
          onClose={() => setModal(null)}
          wide={["news", "document"].includes(modal.type)}
        >
          {modal.type === "news" && (
            <>
              <div className="article-meta">
                <span className="tag">{modal.data.category}</span>
                <span>{formatDate(modal.data.date)}</span>
                <span>
                  <Clock3 size={14} />
                  {modal.data.readTime}
                </span>
              </div>
              <p className="article-intro">{modal.data.excerpt}</p>
              <div className="article-body">
                {modal.data.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="article-footer">
                <Users size={17} />
                {modal.data.department}
                <span>Comunicado de ejemplo</span>
              </div>
            </>
          )}
          {modal.type === "document" && (
            <>
              <div className="article-meta">
                <span className="tag">{modal.data.category}</span>
                <span>Versión {modal.data.version}</span>
                <span>{formatDate(modal.data.date)}</span>
              </div>
              <div className="resource-notice">
                <BookOpen size={18} />
                <p>
                  Material académico de ejemplo. No es una política oficial.
                </p>
              </div>
              <div className="article-body">
                {modal.data.sections.map((section) => (
                  <section key={section.title}>
                    <h3>{section.title}</h3>
                    <p>{section.text}</p>
                  </section>
                ))}
              </div>
              <div className="modal-actions">
                <button
                  className="button button-primary"
                  onClick={() => downloadDocument(modal.data)}
                >
                  <ArrowDownToLine size={17} /> Descargar guía (.txt)
                </button>
                <button
                  className="button button-secondary"
                  aria-pressed={favorites.includes(modal.data.id)}
                  onClick={() => toggleFavorite(modal.data.id)}
                >
                  <Bookmark size={17} />
                  {favorites.includes(modal.data.id)
                    ? "Guardado en favoritos"
                    : "Guardar en favoritos"}
                </button>
              </div>
            </>
          )}
          {modal.type === "event" && (
            <>
              <div className="article-meta">
                <span className="tag">Agenda de ejemplo</span>
                <span>{modal.data.day} de octubre de 2026</span>
              </div>
              <p className="article-intro">{modal.data.description}</p>
              <div className="event-details">
                <p>
                  <Clock3 size={17} />
                  {modal.data.time} · Hora de Guatemala
                </p>
                <p>
                  <Users size={17} />
                  {modal.data.area}
                </p>
              </div>
              <p className="small-muted">
                Esta actividad es demostrativa; no genera una inscripción.
              </p>
            </>
          )}
          {modal.type === "notifications" && (
            <>
              <p className="small-muted">
                Últimas publicaciones de los equipos del banco.
              </p>
              <div className="notification-list">
                {news.map((item) => (
                  <button key={item.id} onClick={() => openNews(item)}>
                    <span className="icon-tile tone-green">
                      <Bell size={19} />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <small>
                        {item.department} · {formatDate(item.date)}
                      </small>
                    </span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </>
          )}
        </Modal>
      )}
      <div
        className={`toast ${toast ? "toast-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <Check size={17} />
            {toast}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
