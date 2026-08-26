# Instalar Chatbot Builder MVP

## 1. Copiar archivos

Extrae el ZIP y copia su contenido dentro de:

`C:\Users\R1WAF\Desktop\qubesight`

Acepta reemplazar `src/pages/Dashboard.tsx` y `src/index.css`.

## 2. Crear la tabla en Lovable Cloud

Abre **Cloud > SQL editor** y ejecuta el contenido completo de:

`supabase/migrations/20260824020000_chatbot_builder_mvp.sql`

La consulta debe indicar `Query succeeded`.

## 3. Verificar localmente

En PowerShell:

```powershell
cd "C:\Users\R1WAF\Desktop\qubesight"
git branch --show-current
npm run build
npm run dev
```

Entra a `/dashboard`, abre **Chatbots**, crea uno, genera su configuración, guárdalo y vuelve a iniciar sesión para confirmar que persiste.

## 4. Publicar la rama

```powershell
git add src/pages/Dashboard.tsx src/index.css supabase/migrations/20260824020000_chatbot_builder_mvp.sql
git commit -m "feat: add chatbot builder MVP"
git push -u origin feature/chatbot-builder-mvp
```

Después crea el Pull Request en GitHub. No ejecutes `git push main origin`; el orden correcto siempre es `git push origin <rama>`.

## Alcance de esta fase

- Constructor desde una descripción en lenguaje natural.
- Configuración editable y persistencia en Supabase.
- Aislamiento de datos por empresa mediante RLS.
- Activación como borrador o activo.
- Simulador básico dentro del dashboard.

La respuesta generativa con IA real y los canales Web, Telegram y WhatsApp se conectan en las siguientes fases mediante funciones de servidor; nunca se debe colocar una clave privada en React.
