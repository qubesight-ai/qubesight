# Demo de voz real de Matilda en el Hero

## Inspección y alcance

La conexión ya existe: `PrototypeShellHome` muestra `HeroInteractiveDemo` y, más abajo, `MatildaVoiceDemo`. Ambos usan `useMatildaLiveCall` y `MatildaLiveCallButton`.

El hook ya invoca `voice-demo-session`, conecta una `Room`, activa el micrófono, reproduce audio remoto, recibe transcripciones y desconecta según `max_seconds`. No hay que construir una segunda integración.

Problemas encontrados:
- El Hero mezcla respuestas locales predeterminadas con transcripciones de la llamada real.
- La conexión a la sala no confirma que Matilda haya entrado; el micrófono activo no se muestra como estado independiente.
- Cancelar mientras se solicita la sesión o se conecta puede permitir que la operación pendiente reactive la llamada. Un doble inicio también puede solicitar dos sesiones.
- La respuesta solo se comprueba por la presencia del token; faltan validación del resto de campos y mensajes seguros para expiración, permisos y conexión.
- El contador comienza después de habilitar el micrófono, aunque el límite del servidor empieza antes.

**Solo se propone modificar la demo pública del frontend.** Diseño, dashboard, autenticación, RLS, Test Call, agentes privados, función existente, worker, LiveKit, VPS y secretos quedan fuera. No se iniciarán llamadas reales ni se desplegará/publicará nada con esta aprobación.

## Archivos que modificaría

| Archivo | Cambio propuesto |
| --- | --- |
| `src/lib/matildaLiveSession.ts` — nuevo | Validar la respuesta con Zod, invocar la función con cancelación y convertir errores en mensajes seguros. Reutilizar `readFunctionError` sin modificarlo. |
| `src/hooks/useMatildaLiveCall.ts` | Proteger inicio/cancelación, liberar recursos, detectar presencia de Matilda y micrófono, respetar el plazo recibido y tratar expiración/desconexión. |
| `src/components/MatildaLiveCallButton.tsx` | Mostrar conectando, conectado/esperando a Matilda, Matilda conectada, hablando, micrófono activo, finalizar y error; explicar el permiso antes del clic. Conservar botones y estilo actuales. |
| `src/components/sections/HeroInteractiveDemo.tsx` | Durante la llamada, mostrar únicamente transcripciones reales y deshabilitar la conversación local y sus acciones rápidas. Mantener intacta la simulación cuando no hay una llamada. No borrar el resultado real al finalizar. |
| `src/test/matildaLiveSession.test.ts` — nuevo | Contrato de sesión y errores con llamadas externas simuladas. |
| `src/test/useMatildaLiveCall.test.tsx` — nuevo | Ciclo de llamada, presencia del agente, permisos, cancelación, audio y duración con SDK simulado. |
| `AGENTS.md` | Registrar en una línea que la demo pública comparte un servicio/hook y permanece separada de Test Call y del envío de WhatsApp. |
| `roadmap.md` | Registrar el alcance aprobado y marcarlo tras las verificaciones. |

`MatildaVoiceDemo.tsx` no requiere cambios: recibirá las mejoras del hook y botón compartidos. Tampoco se propone modificar CSS, `package.json`, configuración ni migraciones.

## Dependencias

Ya están instalados `livekit-client` (`^2.22.3`), Zod, Vitest y Testing Library. No hay que agregar dependencias ni reinstalarlas para esta inspección.

## Conexión y desconexión propuestas

1. El visitante ve que la llamada utiliza su micrófono y pulsa el botón existente.
2. Bloquear un segundo inicio y solicitar `voice-demo-session` con una señal de cancelación.
3. Validar `server_url` como URL `wss:` sin credenciales incrustadas, `participant_token` no vacío, `room_name` con prefijo exacto `qs-test-demo-` y `max_seconds` entero positivo. No generar, almacenar persistentemente ni registrar tokens.
4. Iniciar el plazo al recibir la sesión, antes de conectar, para que los permisos y conexión no extiendan su duración.
5. Conectar a LiveKit, habilitar reproducción y solicitar/publicar el micrófono usando el SDK. Mostrar micrófono activo solo cuando su publicación sea confirmada.
6. Separar conexión a la sala de presencia del participante de tipo agente: conectado → esperando a Matilda → Matilda conectada. Mostrar hablando solo a partir del agente, no de cualquier participante remoto.
7. Reproducir audio y mostrar transcripciones reales. No usar las respuestas locales del Hero durante la llamada.
8. Al finalizar, expirar, desconectarse o desmontarse: invalidar la operación pendiente, abortar la solicitud, cancelar temporizadores, detener micrófono, quitar audio y escuchas, y desconectar. Una respuesta tardía no puede reconectar.
9. Mostrar errores comprensibles y bilingües para permiso denegado, micrófono ausente, fallo de conexión, sesión/token rechazado y límite de solicitudes. No mostrar mensajes internos del proveedor ni prometer que todo rechazo implica expiración.

## WhatsApp: límite y verificación pendiente

La función conserva `qs-test-demo-` y despacha el nombre configurado del agente, con el identificador y token de runtime únicamente en los metadatos privados del dispatch.

**La copia del worker en este repositorio no contiene una herramienta de WhatsApp ni su protocolo de confirmación.** Tampoco hay en el frontend un evento fiable que permita habilitar un botón después de confirmar el número. Esto no demuestra que falte en el worker desplegado, pero impide certificar el envío desde esta inspección.

No añadiré un botón de envío ni habilitaré uno mediante palabras de la transcripción. No cambiaré los enlaces comerciales generales de WhatsApp. La herramienta del worker debe exigir un número costarricense de ocho dígitos, repetirlo y recibir confirmación explícita antes del envío. Para comprobarlo posteriormente se necesita revisar el contrato/código de esa herramienta desplegada; una prueba real y cualquier envío requieren aprobación separada. Si no existe, informaré el bloqueo sin modificar el worker por cuenta propia.

## Diff propuesto — fragmentos principales, no aplicado

Los siguientes fragmentos describen el cambio; el diff completo se mostrará después de implementar y antes de cualquier llamada real o despliegue.

```diff
--- /dev/null
+++ src/lib/matildaLiveSession.ts
+import { z } from "zod";
+import { supabase } from "@/integrations/supabase/client";
+import { readFunctionError } from "@/lib/functionError";
+
+const sessionSchema = z.object({
+  server_url: z.string().url().refine((url) => {
+    const parsed = new URL(url);
+    return parsed.protocol === "wss:" && !parsed.username && !parsed.password;
+  }),
+  participant_token: z.string().min(1),
+  room_name: z.string().startsWith("qs-test-demo-"),
+  max_seconds: z.number().int().positive(),
+});
+
+// createMatildaLiveSession(signal): invoca voice-demo-session,
+// normaliza errores y devuelve sessionSchema.parse(data).
```

```diff
--- src/hooks/useMatildaLiveCall.ts
+++ src/hooks/useMatildaLiveCall.ts
-import { supabase } from "@/integrations/supabase/client";
+import { createMatildaLiveSession } from "@/lib/matildaLiveSession";
+// Añadir refs de operación activa y AbortController;
+// invalidarlas antes de liberar recursos.
+// Añadir agentConnected, microphoneActive y motivo de finalización.
@@
-    if (room.current) return;
+    if (operation.current) return;
@@
-      const { data, error: fnError } = await supabase.functions.invoke<SessionResponse>(
-        "voice-demo-session",
-        { body: {} },
-      );
+      const data = await createMatildaLiveSession(controller.signal);
+      // Comprobar que esta operación sigue vigente después de cada await.
+      // Iniciar el plazo aquí y cancelar también una conexión pendiente al vencer.
@@
-        setAgentSpeaking(speakers.some((p) => p.identity !== lk.localParticipant.identity));
+        setAgentSpeaking(speakers.some((p) => p.kind === ParticipantKind.AGENT));
@@
-  return { status, error, remaining, lines, agentSpeaking, start, hangUp };
+  return { status, error, remaining, lines, agentSpeaking,
+    agentConnected, microphoneActive, endReason, start, hangUp };
```

```diff
--- src/components/MatildaLiveCallButton.tsx
+++ src/components/MatildaLiveCallButton.tsx
@@
-              : "Te escucho, habla con naturalidad."
+              : call.agentConnected ? "Matilda conectada" : "Esperando a Matilda…"
+      // Estado separado: conectado a la sala y micrófono activo.
+      // Mensaje de sesión finalizada/expirada y errores seguros ES/EN.

--- src/components/sections/HeroInteractiveDemo.tsx
+++ src/components/sections/HeroInteractiveDemo.tsx
@@
-        {messages.map((message) =>
+        {(!voiceSessionVisible ? messages : []).map((message) =>
@@
-        {typing && (
+        {!voiceSessionVisible && typing && (
+      // Deshabilitar entrada y acciones simuladas durante connecting/live;
+      // cancelar una respuesta simulada pendiente al iniciar la llamada.
```

## Pruebas locales previstas, sin proveedores reales

- Verificar campos completos y rechazo de prefijos distintos de `qs-test-demo-`, URL insegura y duración inválida.
- Confirmar que se invoca únicamente `voice-demo-session`, con cuerpo vacío, y se conecta con los datos devueltos.
- Inicio doble produce una sola solicitud; cancelar antes o después de conectar no reactiva la llamada; una operación antigua no afecta una nueva.
- Presencia de participante de tipo agente y publicación real del micrófono cambian sus estados de forma independiente; un visitante remoto no se considera Matilda.
- Audio remoto se adjunta/reproduce y se elimina al terminar; las pistas del micrófono se detienen.
- Con reloj simulado y `max_seconds = 20`, la llamada se desconecta a los 20 segundos desde recibir la sesión, incluyendo tiempo de conexión/permisos.
- Permiso denegado, fallo de conexión, rechazo de token, 429 y desconexión no activan fallback ni filtran datos sensibles.
- El Hero no produce respuestas simuladas mientras la llamada está activa. No añadir pruebas de textos, estilo ni snapshots.
- Ejecutar los tests nuevos y los tests de voz existentes, revisión de diff y `node scripts/architecture-check.mjs`. La plataforma ejecutará compilación y verificación de tipos; revisar su resultado sin lanzar compilaciones manuales.
- Revisar la demo en escritorio y móvil con LiveKit y función simulados, sin crear salas, consumir cuotas ni enviar WhatsApp. No afirmar verificación de audio real con una prueba simulada.

## Riesgos, aprobación y rollback

- Los navegadores móviles pueden exigir interacción adicional para audio; se mostrará un control de reproducción solo si el SDK informa bloqueo.
- Cancelar en el navegador no garantiza eliminar una sala ya creada en el servidor; se conserva la limpieza existente del backend y no se modifica en este alcance.
- La función intenta eliminar la sala a los 125 segundos mediante `EdgeRuntime.waitUntil`; esta inspección no verifica que esa tarea se complete en producción ni permite conocer el plazo exacto restante del servidor.
- El Hero y la sección inferior tienen hoy llamadas independientes. No se ampliará el alcance para reorganizarlas en esta primera propuesta; la protección contra doble inicio se aplica por instancia.
- El envío de WhatsApp queda sin certificar hasta revisar la herramienta desplegada y realizar una prueba aprobada.
- Rollback: revertir únicamente los cambios de frontend y sus tests; no existen migraciones ni cambios de infraestructura que deshacer.

Base inspeccionada: `c369e483dddc28644ecaefa01f51122257b7e127`, rama de trabajo administrada `edit/edt-355758cc-9e46-4bc8-8fcc-917c134e56cb`. No se verificó que equivalga al último `main` de GitHub ni se inspeccionaron PR remotos; no se cambiará la rama automáticamente. Canonical: `qubesight-ai/qubesight`.

**Siguiente acción:** aprobar el ajuste limitado de la demo pública; mostrar después el diff completo y resultados locales antes de autorizar pruebas reales o publicación.