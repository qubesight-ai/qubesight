# Flujo completo de agentes de voz (solo producto/frontend)

Sin tocar infraestructura, VPS, Twilio, secretos, Edge Functions ni base de datos. Sin reconcile.

## Estado actual

- Todo el panel vive en `src/pages/Dashboard.tsx` (963 líneas): navegación, resumen, lista de agentes, chatbots, llamadas, perfil y los dos editores en modal.
- Crear y editar agente ya funciona, pero solo dentro de una ventana emergente. Al guardar se cierra y se vuelve a la lista.
- Existe una sola dirección web: `/dashboard`. Cada sección es un estado interno, así que no se puede compartir ni recargar la vista de un agente.
- Las acciones de despliegue (`AgentRuntimeActions`) ya existen y llaman a estado / desplegar / reiniciar / detener, pero aparecen apretadas en la fila de la lista.
- La información de versiones (revisión configurada y revisión desplegada) hoy solo se usa internamente para marcar "pendiente"; el usuario no ve números ni explicación.

## Plan mínimo

1. **Nueva dirección real** `/dashboard/agents/:id` (y `/dashboard/agents/new` para crear), registrada junto a `/dashboard` y protegida igual.
2. **Nueva página de agente** con todo en un solo lugar:
   - formulario de configuración con botón Guardar (misma lógica actual: al crear se añade la organización, al editar solo se envían los campos de configuración);
   - bloque de estado: estado de despliegue en palabras (Sin desplegar / Desplegando / En ejecución / Degradado / Detenido / Error), última revisión guardada vs. última desplegada, fecha de último despliegue y último error si lo hay;
   - aviso destacado "Tienes cambios sin desplegar" cuando la revisión guardada supera a la desplegada o nunca se ha desplegado;
   - botones Consultar estado, Desplegar, Reiniciar, Detener (reutilizando el componente existente, sin cambiar sus llamadas).
3. **La lista de agentes** deja de abrir la ventana emergente: cada fila enlaza a su página, y "Nuevo agente" va a la página de creación. Se muestra ahí una etiqueta compacta de estado y el aviso de cambios pendientes.
4. **Carga individual**: un hook pequeño que lee ese agente por su identificador cuando se entra directo por URL (misma consulta ya permitida hoy).

## Qué conviene extraer de Dashboard.tsx

Mover a un módulo `src/features/agents/`:

- `AgentEditor` (formulario) → `AgentForm.tsx`, reutilizable en la página.
- `Agents` (lista) → `AgentsList.tsx`.
- Constante `emptyAgent` y utilidades de guardado → `agentService.ts`.
- Textos de estado y cálculo de "pendiente de desplegar" → `provisioningStatus.ts` (hoy duplicados en `AgentRuntimeActions`).

Además, `Dashboard.tsx` pasa a usar rutas anidadas para la sección de agentes, quedando como contenedor de navegación. No se toca chatbots, telefonía ni llamadas en este paso.

## Riesgos

- La navegación por secciones es estado interno; al introducir rutas hay que mantener el resaltado del menú sincronizado con la URL.
- El modal de edición se elimina para agentes: cualquier atajo o enlace previo debe apuntar a la nueva página.
- Entrar directo a un agente inexistente o de otra organización debe mostrar un mensaje claro, no una pantalla en blanco.
- Detener y reiniciar afectan el servicio real: se conserva la confirmación previa y no se añade ninguna acción automática.

## Detalles técnicos

Archivos a modificar: `src/App.tsx` (rutas), `src/pages/Dashboard.tsx` (extracción + `Outlet`), `src/components/dashboard/AgentRuntimeActions.tsx` (reutilizar etiquetas compartidas), `src/hooks/useDashboardData.ts` (sin cambios de consulta). Nuevos: `src/pages/dashboard/AgentDetail.tsx`, `src/features/agents/*`.
