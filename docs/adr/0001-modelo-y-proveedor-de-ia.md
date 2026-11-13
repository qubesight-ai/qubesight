# ADR-0001: proveedor de IA administrado detrás de los servicios confiables

- Estado: Aceptado
- Fecha: 2026-11-13
- Decide: Ernesto Libby Lugo, fundador y responsable de producto y arquitectura

## Contexto

QubeSight necesita respuestas conversacionales para sus canales de atención. La calidad, el idioma, la latencia, la disponibilidad y el costo pueden cambiar entre proveedores. La interfaz del cliente no debe conocer credenciales ni depender directamente de un proveedor externo.

## Decisión

- La IA se invoca únicamente desde servicios confiables de QubeSight.
- El proveedor y el modelo se seleccionan desde configuración protegida por entorno.
- Las entradas, límites de costo y resultados se validan antes de devolver una respuesta.
- Las credenciales de terceros nunca se entregan a la interfaz ni se escriben en el repositorio.
- El contrato interno permite sustituir el proveedor sin cambiar la experiencia del cliente.

## Alternativas descartadas

- Llamar al proveedor directamente desde el navegador: expondría credenciales y dificultaría aplicar límites por organización.
- Permitir que cada cliente introduzca sus propias claves en la interfaz: aumentaría el riesgo operativo y de filtración.
- No usar IA para la conversación: reduciría el valor principal del producto y no permitiría validar el caso de uso del MVP.

## Consecuencias

Se obtiene mayor control de seguridad, presupuesto y sustitución de proveedores. A cambio, QubeSight debe mantener una capa de integración, pruebas de regresión y límites de consumo. El costo se considera variable y debe medirse por organización y por llamada o conversación.

## Cómo se verifica

La revisión de código debe confirmar que las llamadas externas ocurren solo en servicios confiables, que no hay credenciales en el cliente y que existen límites de entrada, salida y consumo. El checklist de CI y las pruebas de autorización deben pasar antes de publicar.
