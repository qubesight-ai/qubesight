# ADR-0003: los datos viven en servicios administrados y separados por organización

- Estado: Aceptado
- Fecha: 2026-11-13
- Decide: Ernesto Libby Lugo, fundador y responsable de producto y arquitectura

## Contexto

QubeSight maneja identidad, organizaciones, configuración de agentes, llamadas, audio, transcripciones y prospectos. Parte de la operación utiliza proveedores externos. El aislamiento entre organizaciones, la minimización y la posibilidad de borrar datos son requisitos del producto.

El audio y la transcripción son datos potencialmente sensibles y se necesitan para prestar la atención conversacional solicitada, revisar la calidad y resolver incidentes. No se recolectan para inferir características sensibles ni para tomar decisiones automatizadas sobre la persona.

## Decisión

- La fuente de verdad de los datos de negocio es un servicio de datos administrado por QubeSight.
- Cada registro de una organización se autoriza server-side y queda aislado de los registros de otras organizaciones.
- Los secretos se conservan en un almacén protegido y nunca se devuelven a la interfaz.
- Solo se envía a un tercero el dato necesario para la finalidad autorizada.
- Audio, transcripciones, teléfonos y prospectos se conservan durante el plazo aprobado y luego se eliminan o anonimizan.
- Los datos temporales de sesión no son la fuente de verdad y tienen un vencimiento corto.

## Alternativas descartadas

- Guardar datos de clientes en archivos o registros del navegador: dificultaría el aislamiento, la auditoría y la eliminación.
- Enviar toda la conversación a todos los proveedores: aumentaría la exposición y no respeta la minimización.
- Usar un identificador enviado por la interfaz como única autorización: permitiría intentar acceder a otra organización.

## Consecuencias

Se facilita la auditoría, el aislamiento y la recuperación. Antes de una expansión comercial se deben aprobar los plazos de retención, el procedimiento de supresión, las transferencias internacionales y las responsabilidades contractuales de cada tercero.

## Cómo se verifica

La revisión debe comprobar reglas de acceso por organización, pruebas con dos organizaciones, ausencia de secretos en respuestas del cliente, validación de borrado y un inventario actualizado de los terceros que reciben datos.

