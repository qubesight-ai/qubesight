# ADR-0002: la IA propone y una persona autoriza las decisiones con efecto

- Estado: Aceptado
- Fecha: 2026-11-13
- Decide: Ernesto Libby Lugo, fundador y responsable de producto y arquitectura

## Contexto

La IA interpreta conversaciones, clasifica intenciones, responde con conocimiento aprobado y captura oportunidades comerciales. Sus respuestas pueden influir en clientes y en el trabajo del equipo, por lo que una respuesta generada no debe convertirse por sí sola en una decisión irreversible.

## Decisión

- La IA puede interpretar lenguaje, clasificar intención, resumir, responder con conocimiento aprobado y sugerir un siguiente paso.
- La IA nunca confirma por sí sola pagos, matrículas, contratos, reembolsos, cambios de cuenta, llamadas salientes, mensajes externos ni despliegues.
- Toda acción externa requiere autorización confiable, validación, consentimiento cuando corresponda y una confirmación verificable.
- Si una acción falla o no devuelve confirmación de éxito, la IA debe decir que no se completó.
- Una persona revisa o recibe los casos inciertos, sensibles, fuera de alcance o reclamados.

## Alternativas descartadas

- Dejar que la IA ejecute acciones comerciales sola: podría producir compromisos no autorizados o falsos.
- Ocultar al usuario que una respuesta es una propuesta: impediría corregir errores antes de que tengan efecto.

## Consecuencias

Se reduce el riesgo de promesas falsas, acciones no autorizadas y pérdida de control humano. Se requiere mantener rutas de escalamiento, revisión de casos y registros de confirmación, lo que añade trabajo operativo.

## Cómo se verifica

Las pruebas deben demostrar que una respuesta generada no puede ejecutar una acción externa sin pasar por su control autorizado. Debe existir un caso de prueba para fallos de herramienta y otro para derivación humana. El texto de confirmación solo se permite después de una respuesta verificable de éxito.
