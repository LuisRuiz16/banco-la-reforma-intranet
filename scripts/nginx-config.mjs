import { readFile, mkdir, writeFile } from "node:fs/promises";
import { loadEnv } from "vite";
import { readConfig, externalOrigins } from "../src/config.js";

const config = readConfig({
  ...loadEnv("production", process.cwd(), "VITE_"),
  ...process.env,
});
const template = await readFile("nginx.conf", "utf8");
const origins = externalOrigins(config).join(" ");
const frames = config.auth.url ? new URL(config.auth.url).origin : "'none'";
const result = template
  .replace("connect-src 'self';", `connect-src 'self' ${origins};`)
  .replace("frame-src 'none';", `frame-src ${frames};`);
await mkdir(".generated", { recursive: true });
await writeFile(".generated/nginx.conf", result);
console.log("Configuración Nginx generada con los orígenes autorizados.");
