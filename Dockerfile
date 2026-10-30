# Construye los archivos estáticos de React.
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_HELPDESK_URL=""
ENV VITE_HELPDESK_URL=$VITE_HELPDESK_URL
ARG VITE_AUTH_ENABLED="false"
ARG VITE_KEYCLOAK_URL=""
ARG VITE_KEYCLOAK_REALM=""
ARG VITE_KEYCLOAK_CLIENT_ID="intranet"
ARG VITE_KEYCLOAK_ROLE_SOURCE="client"
ARG VITE_KEYCLOAK_ROLE_CLIENT_ID="intranet"
ARG VITE_MESSAGE_READ_URL=""
ARG VITE_MESSAGE_WRITE_URL=""
ARG VITE_MESSAGE_WRITE_METHOD="PUT"
RUN npm run build

# Nginx publica el resultado. No necesita Node.js en producción.
FROM nginx:stable-alpine
COPY --from=build /app/.generated/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1/health || exit 1
