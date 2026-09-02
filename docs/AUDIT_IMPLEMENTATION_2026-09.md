# QubeSight Core — implementación de auditoría, septiembre de 2026

## Alcance de esta entrega

Esta rama aplica la ficha técnica sobre el estado real de `main@097bab9`. Conserva la
integración Twilio del PR #19 y no modifica los runtimes de Matilda ni Tem.

## Matriz de cumplimiento

| Requisito                 | Implementación                                                                                                                                 | Estado                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| API keys solo en servidor | Groq, Twilio y pagos permanecen en Supabase Edge Functions. `.env` deja de versionarse y `.env.example` contiene únicamente variables públicas | Cumplido                            |
| TypeScript estricto       | `strict`, `noImplicitAny` y `noFallthroughCasesInSwitch`; `ChatbotDemo.jsx` migrado a `.tsx`                                                   | Cumplido                            |
| Validación de payloads    | `chatbot-ai` valida acciones, mensajes, configuración y límites con Zod antes de llamar al proveedor                                           | Cumplido                            |
| SRP / desacoplamiento     | `useDashboardData` concentra consultas; `useChatStream` gestiona el ciclo del stream; `chatbotAi.ts` actúa como adaptador del backend          | Cumplido en los flujos intervenidos |
| Streaming                 | Groq usa `stream: true`; la Edge Function transmite SSE sin almacenar la respuesta completa y el simulador renderiza tokens progresivamente    | Cumplido                            |
| Caché                     | Generaciones idénticas se cachean durante 10 minutos, por usuario y hash SHA-256, con máximo de 100 entradas por instancia                     | Cumplido                            |
| Assets                    | Imágenes visibles de fundadores/casos convertidas a WebP, lazy loading existente y rutas cargadas con `React.lazy`                             | Cumplido                            |
| Calidad local             | Prettier, ESLint, TypeScript, Vitest, Husky y lint-staged                                                                                      | Cumplido                            |
| CI/CD                     | Quality gate en PR/push y revisión de secretos/políticas arquitectónicas                                                                       | Cumplido                            |
| Agentic engineering       | `.cursorrules` obliga TypeScript, SRP, validación, aislamiento de secretos, RLS y pruebas                                                      | Cumplido                            |

## Variables

Variables públicas de Vite:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_MATILDA_DEMO_API_URL`
- `VITE_TURNSTILE_SITE_KEY`

Secretos de servidor (configurar mediante Supabase Secrets; nunca prefijar con `VITE_`):

- `GROQ_API_KEY`
- `RATE_LIMIT_HASH_SECRET`
- secretos de Twilio/Vault definidos por `twilio-connection`
- credenciales de dLocal Go definidas por sus Edge Functions

## Contrato del streaming

`POST /functions/v1/chatbot-ai` recibe un JWT de usuario y:

```json
{
  "action": "chat",
  "stream": true,
  "config": { "system_prompt": "..." },
  "messages": [{ "role": "user", "content": "Hola" }]
}
```

La respuesta es `text/event-stream`, compatible con el formato incremental de OpenAI. El
cliente la consume mediante `streamChatWithGroq`; ningún secreto del proveedor llega al navegador.

## Verificación obligatoria

```bash
npm ci
npm run validate
node scripts/architecture-check.mjs
```

Antes de desplegar, publicar la versión nueva de `chatbot-ai` y comprobar en staging: JWT inválido,
payload inválido, rate limit, primer token, cancelación, respuesta completa y fallback local.
