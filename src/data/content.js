// EDITA AQUÍ el contenido del portal. No necesitas cambiar los componentes.
// La descripción y las cinco áreas proceden de la propuesta del proyecto.
// Comunicados, agenda y documentos son ejemplos para la demostración académica.
export const bank = {
  name: "Banco La Reforma",
  location: "Ciudad de Guatemala",
  description:
    "Somos una institución financiera ficticia de tamaño mediano, con una sede en Ciudad de Guatemala. Atendemos a personas y pequeñas y medianas empresas, y trabajamos para organizar mejor la información y la colaboración entre nuestros equipos.",
  purpose:
    "Acercar la información, conectar a las personas y facilitar el trabajo de cada día.",
};

export const departments = [
  {
    id: "gerencia",
    name: "Gerencia General",
    short: "Gerencia",
    icon: "landmark",
    color: "green",
    initials: "GG",
    description:
      "Orienta el rumbo de la organización y coordina a las jefaturas para alcanzar los objetivos institucionales.",
    roles: ["Gerente General", "Jefaturas"],
    tasks: [
      "Dirección y planificación institucional",
      "Coordinación de las áreas",
      "Comunicación de prioridades",
    ],
    email: "gerencia@bancolareforma.example",
    extension: "101",
  },
  {
    id: "personas",
    name: "Recursos Humanos",
    short: "Recursos Humanos",
    icon: "users",
    color: "peach",
    initials: "RH",
    description:
      "Acompaña a nuestros colaboradores y facilita la información sobre incorporación, formación y convivencia laboral.",
    roles: ["Jefe de Recursos Humanos", "Analistas de Recursos Humanos"],
    tasks: [
      "Inducción de colaboradores",
      "Formación y desarrollo",
      "Comunicación de políticas internas",
    ],
    email: "personas@bancolareforma.example",
    extension: "102",
  },
  {
    id: "tecnologia",
    name: "Tecnología",
    short: "Tecnología",
    icon: "monitor",
    color: "blue",
    initials: "TI",
    description:
      "Administra la infraestructura y los servicios tecnológicos que permiten el trabajo diario de la organización.",
    roles: [
      "Administrador de Sistemas",
      "Analistas Programadores",
      "Soporte Técnico",
    ],
    tasks: [
      "Infraestructura y servicios de red",
      "Soporte a colaboradores",
      "Administración de aplicaciones",
    ],
    email: "tecnologia@bancolareforma.example",
    extension: "103",
  },
  {
    id: "operaciones",
    name: "Operaciones",
    short: "Operaciones",
    icon: "layers",
    color: "gold",
    initials: "OP",
    description:
      "Coordina los procesos operativos internos y promueve una ejecución ordenada de las actividades del banco.",
    roles: ["Jefe de Operaciones", "Supervisores", "Personal Operativo"],
    tasks: [
      "Coordinación de procesos internos",
      "Seguimiento de procedimientos",
      "Mejora continua de actividades",
    ],
    email: "operaciones@bancolareforma.example",
    extension: "104",
  },
  {
    id: "cumplimiento",
    name: "Cumplimiento",
    short: "Cumplimiento",
    icon: "shield",
    color: "purple",
    initials: "CU",
    description:
      "Promueve el conocimiento de las políticas institucionales y acompaña la revisión de los controles internos.",
    roles: ["Jefe de Cumplimiento", "Analistas de Cumplimiento"],
    tasks: [
      "Difusión de políticas internas",
      "Seguimiento de controles",
      "Orientación sobre buenas prácticas",
    ],
    email: "cumplimiento@bancolareforma.example",
    extension: "105",
  },
];

export const news = [
  {
    id: "bienvenida-intranet",
    title: "Un nuevo espacio para estar más cerca",
    category: "Institucional",
    department: "Gerencia General",
    date: "2026-10-25",
    readTime: "2 min",
    featured: true,
    visual: "building",
    excerpt:
      "Bienvenidos a nuestra intranet: la información que necesitas, en un solo lugar.",
    body: [
      "Nuestra intranet reúne información institucional, comunicados, documentos de consulta y un directorio de áreas. Su propósito es facilitar el acceso a los recursos y reducir la dispersión de información.",
      "Desde el menú puedes conocer al banco, consultar los comunicados, explorar documentos o encontrar el área que necesitas. El buscador también te ayuda a localizar estos contenidos por palabras clave.",
      "Esta primera versión es un portal informativo del proyecto académico. La autenticación con Keycloak y la mesa de servicios se integrarán en etapas posteriores del proyecto.",
    ],
  },
  {
    id: "seguridad-digital",
    title: "La seguridad empieza con pequeños hábitos",
    category: "Tecnología",
    department: "Tecnología",
    date: "2026-10-23",
    readTime: "3 min",
    featured: true,
    visual: "security",
    excerpt:
      "Cinco recordatorios para cuidar tus accesos y la información con la que trabajas.",
    body: [
      "Usa contraseñas diferentes para cada servicio y no las compartas. Cuando esté disponible, activa la autenticación multifactor.",
      "Verifica el remitente y la dirección de los enlaces antes de abrirlos. Si un mensaje solicita credenciales o genera urgencia, comunícalo al área de Tecnología.",
      "Bloquea tu equipo cuando te ausentes, mantén el software actualizado y utiliza únicamente los canales autorizados para compartir documentos.",
      "Estas recomendaciones son material educativo de ejemplo y deben complementarse con las políticas que apruebe la organización.",
    ],
  },
  {
    id: "guia-bienvenida",
    title: "Tu primer día, con toda la información a mano",
    category: "Personas",
    department: "Recursos Humanos",
    date: "2026-10-22",
    readTime: "2 min",
    visual: "people",
    excerpt:
      "Consulta la guía de bienvenida y conoce a los equipos que te acompañarán.",
    body: [
      "La guía de bienvenida presenta las áreas del banco y los recursos disponibles en este portal. Es un punto de partida para familiarizarte con la organización.",
      "Explora la sección Nuestro banco, revisa los Departamentos y guarda los documentos que consultarás con frecuencia. En Directorio encontrarás los perfiles de cada área.",
      "El contenido de inducción presentado es una propuesta para el proyecto académico; no representa un procedimiento aprobado por una institución financiera real.",
    ],
  },
  {
    id: "documentos-ordenados",
    title: "Documentos organizados para trabajar mejor",
    category: "Operaciones",
    department: "Operaciones",
    date: "2026-10-20",
    readTime: "2 min",
    visual: "documents",
    excerpt:
      "Encuentra las guías por área y consulta siempre su versión y fecha de actualización.",
    body: [
      "La biblioteca agrupa documentos por tema y área responsable. Puedes buscar por título, previsualizar una guía y descargar una copia en texto.",
      "Los favoritos se guardan únicamente en este navegador. No se sincronizan entre equipos ni sustituyen a una biblioteca documental con control de acceso.",
      "En una siguiente fase, el equipo podrá conectar un repositorio y definir responsables, versiones y permisos para la publicación de documentos oficiales.",
    ],
  },
];

export const documents = [
  {
    id: "bienvenida",
    title: "Guía de bienvenida",
    category: "Recursos Humanos",
    icon: "book",
    version: "1.0",
    date: "2026-10-22",
    description: "Conoce al banco, sus áreas y los recursos para comenzar.",
    sections: [
      {
        title: "Bienvenido a Banco La Reforma",
        text: "Banco La Reforma es una organización ficticia del proyecto del curso de Intranet. Cuenta con una sede en Ciudad de Guatemala y atiende a personas y pequeñas y medianas empresas.",
      },
      {
        title: "Conoce a nuestros equipos",
        text: "La organización se divide en Gerencia General, Recursos Humanos, Tecnología, Operaciones y Cumplimiento. En el directorio se muestran los perfiles de cada área.",
      },
      {
        title: "Explora la intranet",
        text: "Consulta los comunicados, revisa los documentos y utiliza el buscador para localizar información. Los contenidos de esta versión son demostrativos.",
      },
    ],
  },
  {
    id: "seguridad",
    title: "Buenas prácticas de seguridad digital",
    category: "Tecnología",
    icon: "shield",
    version: "1.0",
    date: "2026-10-23",
    description: "Hábitos sencillos para proteger accesos e información.",
    sections: [
      {
        title: "Protege tus credenciales",
        text: "Utiliza contraseñas únicas y autenticación multifactor cuando esté disponible. Nunca compartas contraseñas por correo o mensajería.",
      },
      {
        title: "Reconoce mensajes sospechosos",
        text: "Revisa el remitente y el destino de los enlaces. Reporta solicitudes inesperadas de acceso o información al equipo de Tecnología.",
      },
      {
        title: "Cuida tu equipo",
        text: "Bloquea la sesión al ausentarte y mantén el software actualizado. No incluyas información real de clientes en este laboratorio.",
      },
    ],
  },
  {
    id: "soporte",
    title: "Cómo solicitar soporte técnico",
    category: "Tecnología",
    icon: "headphones",
    version: "1.0",
    date: "2026-10-24",
    description:
      "Prepara la información necesaria para reportar una incidencia.",
    sections: [
      {
        title: "Describe el problema",
        text: "Indica qué intentabas hacer, qué ocurrió y desde cuándo sucede. Incluye el nombre del equipo o aplicación y el mensaje de error.",
      },
      {
        title: "Adjunta evidencia útil",
        text: "Agrega una captura que muestre el problema. Oculta contraseñas, tokens y datos personales o de clientes.",
      },
      {
        title: "Utiliza el canal correspondiente",
        text: "En esta demostración no se envían tickets. Cuando el equipo integre la mesa de servicios, el enlace se configurará desde VITE_HELPDESK_URL.",
      },
    ],
  },
  {
    id: "convivencia",
    title: "Guía de comunicación y convivencia",
    category: "Recursos Humanos",
    icon: "users",
    version: "1.0",
    date: "2026-10-21",
    description:
      "Recomendaciones para una comunicación interna clara y respetuosa.",
    sections: [
      {
        title: "Comunica con claridad",
        text: "Utiliza asuntos descriptivos y mensajes concretos. Comparte la información necesaria con el equipo responsable.",
      },
      {
        title: "Colabora con respeto",
        text: "Escucha las ideas de otras áreas, solicita apoyo a tiempo y confirma los acuerdos de trabajo.",
      },
      {
        title: "Organiza la información",
        text: "Consulta los documentos vigentes, evita copias innecesarias y comunica las actualizaciones a las personas involucradas.",
      },
    ],
  },
  {
    id: "control-documental",
    title: "Organización de documentos internos",
    category: "Operaciones",
    icon: "folder",
    version: "1.0",
    date: "2026-10-20",
    description:
      "Una propuesta para identificar responsables, fechas y versiones.",
    sections: [
      {
        title: "Identifica cada documento",
        text: "Incluye un título claro, área responsable, fecha de actualización y número de versión.",
      },
      {
        title: "Revisa antes de publicar",
        text: "Solicita la revisión del área responsable antes de distribuir un documento como oficial.",
      },
      {
        title: "Mantén un historial",
        text: "Registra los cambios relevantes. En esta versión estática las modificaciones se realizan en los archivos del proyecto.",
      },
    ],
  },
  {
    id: "buenas-practicas",
    title: "Uso responsable de la información",
    category: "Cumplimiento",
    icon: "check",
    version: "1.0",
    date: "2026-10-19",
    description:
      "Criterios de consulta y cuidado de la información institucional.",
    sections: [
      {
        title: "Comparte solo lo necesario",
        text: "Consulta al responsable antes de distribuir información fuera del área o de la organización.",
      },
      {
        title: "Distingue contenido de demostración",
        text: "Esta intranet usa una organización ficticia y documentos de ejemplo. No contiene normas bancarias oficiales ni datos de clientes.",
      },
      {
        title: "Respeta los controles de acceso",
        text: "Los permisos deben aplicarse en el servidor y en las aplicaciones integradas. Una interfaz estática por sí sola no protege información confidencial.",
      },
    ],
  },
];

export const events = [
  {
    id: "induccion",
    day: "27",
    month: "OCT",
    title: "Conoce nuestra intranet",
    time: "09:00 – 09:30",
    area: "Recursos Humanos",
    description:
      "Recorrido de demostración por las secciones del portal y sus recursos. Actividad de ejemplo para el proyecto.",
  },
  {
    id: "taller",
    day: "28",
    month: "OCT",
    title: "Hábitos de seguridad digital",
    time: "10:00 – 10:45",
    area: "Tecnología",
    description:
      "Sesión ilustrativa sobre protección de credenciales y reconocimiento de mensajes sospechosos. Actividad de ejemplo.",
  },
  {
    id: "equipos",
    day: "30",
    month: "OCT",
    title: "Conectando nuestros equipos",
    time: "14:00 – 14:30",
    area: "Gerencia General",
    description:
      "Espacio de ejemplo para compartir necesidades de información entre las cinco áreas del banco.",
  },
];

export const faqs = [
  {
    question: "¿Qué puedo encontrar en esta intranet?",
    answer:
      "Información del banco, comunicados, documentos de consulta, áreas y un directorio de perfiles. Es una primera versión informativa del proyecto académico de Banco La Reforma.",
  },
  {
    question: "¿Cómo busco un documento o comunicado?",
    answer:
      "Usa el buscador de la barra superior. También puedes entrar a Documentos o Comunicados y filtrar los contenidos por área o categoría.",
  },
  {
    question: "¿Dónde se guardan mis documentos favoritos?",
    answer:
      "Se guardan en el almacenamiento local de este navegador. No requieren una cuenta y no se sincronizan entre computadoras. Si borras los datos del navegador, desaparecerán.",
  },
  {
    question: "¿Puedo enviar solicitudes de soporte?",
    answer:
      "Esta versión ofrece una guía para preparar tu solicitud. No crea tickets. Cuando la mesa de servicios del equipo esté disponible, se podrá habilitar su enlace sin cambiar el diseño del portal.",
  },
  {
    question: "¿El portal ya inicia sesión con Keycloak?",
    answer:
      "Todavía no. Esta entrega es estática y no solicita credenciales. La integración con Keycloak y los permisos por rol forman parte de una fase posterior del proyecto.",
  },
  {
    question: "¿Son documentos oficiales de un banco real?",
    answer:
      "No. Banco La Reforma es una organización ficticia del curso. Los comunicados, la agenda y las guías son contenidos de demostración y no deben utilizarse como políticas oficiales.",
  },
];

export function formatDate(
  date,
  options = { day: "numeric", month: "short", year: "numeric" },
) {
  return new Intl.DateTimeFormat("es-GT", options).format(
    new Date(`${date}T12:00:00`),
  );
}

export function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
