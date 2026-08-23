# QubeSight Voice Admin — instalación

La web pública existente y la tabla `leads` se conservan. Esta integración añade:

- `/register`, `/login` y recuperación de contraseña.
- `/dashboard` protegido.
- Onboarding de empresa.
- Gestión real de agentes en Lovable Cloud/Supabase.
- Historial de llamadas preparado para recibir datos del VPS.
- Aislamiento por empresa mediante Row Level Security.

## 1. Aplicar la base de datos

En Lovable abre **Cloud → SQL editor**. Copia y ejecuta, una sola vez, todo el contenido de:

`supabase/migrations/20260824010000_voice_admin_foundation.sql`

No ejecutes repetidamente la misma migración. Esta no modifica ni elimina `leads`.

## 2. Publicar el frontend

Desde la raíz del proyecto:

```bash
npm install
npm run build
git add .
git commit -m "feat: add authenticated Voice Admin dashboard"
git push origin main
```

## 3. Configurar autenticación

En **Cloud → Users → Auth settings**:

1. Activa el registro por correo.
2. Decide si exigirás confirmación de correo.
3. Añade el dominio publicado y la URL local a las Redirect URLs:
   - `https://TU-DOMINIO/dashboard`
   - `http://localhost:5173/dashboard`

## 4. Probar

1. Visita `/register` y crea una cuenta de prueba.
2. Completa el nombre de la empresa.
3. Crea un agente desde Dashboard → Agentes.
4. Cierra sesión, vuelve a entrar y confirma que el agente permanece.

## 5. Conectar el VPS (siguiente etapa)

La interfaz y la persistencia ya quedan preparadas. Para sincronizar el runtime de voz todavía se requiere:

- URL HTTPS del endpoint administrativo del VPS.
- Formato exacto de sus endpoints.
- Un secreto compartido guardado en **Cloud → Secrets**, nunca en variables `VITE_*`.
- Una Edge Function que valide el JWT del usuario y reenvíe solamente operaciones autorizadas.

No guardes la llave administrativa del VPS en React ni en GitHub.
