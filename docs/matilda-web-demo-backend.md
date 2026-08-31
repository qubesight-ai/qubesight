# Backend requerido para la demostración web de Matilda

Este repositorio no contiene el backend Python de Matilda. La interfaz consume el VPS con `VITE_MATILDA_DEMO_API_URL`; hasta desplegar los endpoints, mostrará que el servicio no está disponible.

## Contrato HTTP

- `POST /web-demo/session`: crea una sesión criptográficamente aleatoria, de 10 minutos y cinco turnos; devuelve `session_id`, `remaining_turns`, `expires_at`.
- `POST /web-demo/message`: recibe `multipart/form-data` (`session_id`, `audio`) y devuelve de inmediato `message_id`, `transcript`, `reply`, `remaining_turns`, `audio_status`, `audio_url`.
- `GET /web-demo/message/{message_id}/audio`: responde `202 processing`, `200 ready` con URL temporal o `failed`.
- `DELETE /web-demo/session/{session_id}`: invalida sesión y limpia temporales.

El VPS debe reutilizar Whisper local, el motor conversacional de Matilda, OpenRouter y una instancia residente de Supertonic. No cambie las rutas Twilio. Redis es la autoridad de expiración, turnos, solicitud en curso y separación estricta de sesiones. Use IDs impredecibles, valide magic bytes/formato real, archivo no vacío, tamaño y duración máxima de 30 segundos.

El prompt de demo debe impedir WhatsApp, Calendar, cotizaciones y n8n, y responder en una o dos frases. Supertonic se ejecuta en segundo plano con timeout de 45 segundos; mantenga el texto aunque falle TTS y elimine grabaciones y audios con TTL. No registre contenido ni secretos.

Limite CORS a dominios oficiales de QubeSight, rate limit por IP y sesión, creación de sesiones por IP, encabezados de seguridad y errores públicos sin trazas. Prepare Turnstile antes de crear sesiones. El backend nunca debe confiar en el contador del navegador.

## Variable del frontend

```env
VITE_MATILDA_DEMO_API_URL=https://matilda.qubesightprojects.fun
```

No agregue claves, tokens ni credenciales `VITE_*`.
