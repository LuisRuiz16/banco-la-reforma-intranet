# Cómo explicar tu parte del proyecto

“Mi parte es el portal del Banco La Reforma, desarrollado con React. Incluye información institucional y un mensaje del día. Preparé la integración con Keycloak para iniciar sesión y mostrar opciones según el rol: ADMIN puede editar el mensaje y EMPLEADO puede leerlo.

React envía a la API el texto y el token. La API de mi compañero comprueba los permisos, guarda el mensaje y registra quién lo cambió y cuándo. El navegador nunca se conecta directamente a la base de datos. Docker y Nginx permiten ejecutar el portal en Ubuntu o Windows.”

## Estado de la integración

El código está preparado y tiene pruebas automatizadas. Faltan las URL, realm y contrato definitivo del equipo. Hasta configurarlos y probarlos juntos, explica que **el inicio de sesión y la persistencia real están pendientes de verificación**, no que la demostración ya está conectada.

## Recorrido cuando estén conectados los servicios

1. Abrir la URL y mostrar la redirección a Keycloak.
2. Entrar como EMPLEADO y mostrar el mensaje sin botón de edición.
3. Cerrar sesión, entrar como ADMIN y actualizar el mensaje.
4. Consultar desde otra máquina para comprobar que se guardó en el servidor.
5. Mostrar que una actualización directa con token EMPLEADO es rechazada por la API.
6. Abrir la mesa de servicios para demostrar SSO entre aplicaciones del mismo realm.
7. Mostrar el contenedor. El servidor debe estar encendido para atender a las otras máquinas.

## Respuestas cortas

**¿Necesitas una BD en React?** No. Consume una API, que puede utilizar la tabla daily_message del compañero.

**¿Qué envías al guardar?** Un objeto con content y el token en Authorization. El servidor obtiene el autor de la identidad autenticada.

**¿Ocultar el botón protege los datos?** Es una indicación visual. La protección de la operación está en la validación del token y del rol por la API.

**¿Dónde está el resto de la información?** En src/data/content.js, compilado con React. Los favoritos son locales del navegador; el mensaje institucional es compartido a través de la API.

**¿Qué hace Keycloak?** Centraliza el inicio de sesión y proporciona la identidad y roles. No almacena el mensaje institucional de esta aplicación.

**¿Qué hace Nginx?** Entrega los archivos construidos. React se ejecuta en el navegador. Nginx no ejecuta la BD ni valida por sí solo permisos de la API.

**¿Funciona en Windows?** Sí: con Node.js para desarrollar o Docker Desktop con contenedores Linux. Ubuntu puede alojar el mismo contenedor.

**¿Requiere Internet?** La construcción inicial descarga dependencias. En uso, el navegador necesita alcanzar intranet, Keycloak y API. Si todos están en la red del laboratorio, no tienen que ser servicios públicos de Internet.
