# Ejecutar la intranet en Ubuntu con Docker

Esta guía usa valores genéricos. Cada integrante configura la IP y la red de su propio laboratorio. No se incluyen direcciones internas ni credenciales del equipo original.

## 1. Preparar Ubuntu

Necesitas Git, Docker Engine y el complemento Docker Compose. Sigue la [instalación oficial de Docker para Ubuntu](https://docs.docker.com/engine/install/ubuntu/).

```bash
git clone https://github.com/LuisRuiz16/banco-la-reforma-intranet.git
cd banco-la-reforma-intranet
cp .env.example .env
ip -br address
```

Edita `.env` y cambia `LAB_BIND_IP=127.0.0.1` por una IP que ya esté asignada a la interfaz del laboratorio de tu Ubuntu. No uses la IP de otro equipo. El archivo `.env` no se debe subir a GitHub.

## 2. Construir y arrancar

```bash
sudo docker compose -f compose.ubuntu.yaml up -d --build
sudo docker compose -f compose.ubuntu.yaml ps
```

Docker construye React con Node.js y después Nginx sirve el resultado. No necesitas instalar Node.js en Ubuntu ni mantener una terminal abierta. La construcción inicial necesita Internet.

## 3. Acceder desde otra máquina

En el navegador escribe `http://IP_DE_UBUNTU:8095/`, reemplazando `IP_DE_UBUNTU` por el valor real configurado en `.env`. Para verificar la salud, usa la misma dirección terminada en `/health`: debe responder `ok`.

El servidor y los clientes deben compartir una red accesible. Si usas VirtualBox, conecta las máquinas a la red del proyecto y evita IP duplicadas. El firewall debe permitir TCP 8095 desde los clientes autorizados. `localhost` en una VM cliente apunta a esa VM, no al servidor.

Para la vista informativa usa HTTP: el puerto 8095 no incluye TLS. Para habilitar Keycloak desde otras VMs, publica el portal detrás de un proxy HTTPS con certificado confiable y abre esa URL HTTPS. Escribir HTTPS directamente en 8095 producirá un error de protocolo. Configura las variables y servicios siguiendo [INTEGRACIONES.md](INTEGRACIONES.md).

## 4. Administrar el contenedor

```bash
# Consultar los registros
sudo docker compose -f compose.ubuntu.yaml logs --tail 50

# Detener la intranet
sudo docker compose -f compose.ubuntu.yaml stop

# Volver a iniciar
sudo docker compose -f compose.ubuntu.yaml up -d

# Actualizar el código (guarda o confirma primero tus cambios locales)
git pull --ff-only
sudo docker compose -f compose.ubuntu.yaml up -d --build
```

`restart: unless-stopped` permite recuperar el contenedor cuando inicia Docker, salvo que se haya detenido explícitamente. Ubuntu y Docker deben estar encendidos para atender a otros equipos; Docker Desktop en Windows es una instalación distinta.

## 5. Resolver problemas habituales

- **Cannot assign requested address:** `LAB_BIND_IP` no coincide con una IP de tu Ubuntu. Revisa `ip -br address`.
- **Connection refused:** comprueba Docker, el estado del contenedor y el puerto.
- **No conecta desde otra VM:** revisa red compartida, IP, rutas y firewall.
- **Container name already in use:** las variantes `compose.yaml` y `compose.ubuntu.yaml` usan el mismo contenedor. No ejecutes ambas simultáneamente; detén la variante anterior antes de cambiar.
- **Los cambios no aparecen:** reconstruye con `up -d --build` y recarga el navegador.

La vista informativa funciona sin servicios externos. El login configurable y los roles están implementados en el frontend; necesitan Keycloak y la API del equipo para operar. La BD pertenece al backend del compañero, no al contenedor de React. Toda modificación de variables VITE_ requiere reconstruir la imagen.
