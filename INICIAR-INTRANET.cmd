@echo off
setlocal
cd /d "%~dp0"
where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo Instala Node.js LTS desde https://nodejs.org/ y vuelve a abrir este archivo.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Instalando las dependencias del proyecto...
  call npm.cmd ci
  if errorlevel 1 (
    echo No se pudieron instalar las dependencias. Comprueba tu conexion a Internet.
    pause
    exit /b 1
  )
)
echo Abriendo la intranet en http://127.0.0.1:5173
echo Deja esta ventana abierta mientras uses el portal. Para detenerlo, presiona Ctrl+C.
call npm.cmd run dev -- --open
pause
