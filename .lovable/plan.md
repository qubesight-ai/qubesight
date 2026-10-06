# Réplica funcional de la landing QubeSight

## Objetivo
Recrear la landing a partir de la imagen de referencia: cielo luminoso, nubes, vidrio azul, cubo central, canales flotantes y conversación de Matilda. Mantener intactas las funciones existentes, el contenido comercial, los formularios, las demos, los idiomas, el acceso y el dashboard.

## Cambios
- Convertir la portada en una composición inmersiva de ancho completo, con el titular y llamadas a la acción a la izquierda, el cubo de marca en el centro y la conversación de Matilda a la derecha.
- Rediseñar el menú como barra de cristal horizontal en escritorio y conservar el menú compacto en móvil.
- Integrar las secciones actuales en paneles de cristal sobre el mismo mundo visual, sin eliminar Problema, Propuesta de valor, Solución, Implementación, Quiénes somos, Demo, Early Adopters, FAQ ni contacto.
- Mantener enlaces, scroll por secciones, selector de idioma, inicio de sesión, WhatsApp, formularios y demos operativos.
- Usar la imagen adjunta solo como referencia visual; recrear la interfaz con componentes reales y recursos propios para que siga siendo accesible y adaptable.

## Detalles técnicos
- Aplicar el nuevo sistema visual únicamente dentro de la landing para no afectar `/login`, `/dashboard` ni las demos por industria.
- Crear recursos visuales optimizados para el cielo y el cubo, y reutilizar las fotos existentes de los fundadores.
- Reorganizar estilos acumulados de la landing en una capa final coherente, usando variables semánticas y movimiento reducido cuando el dispositivo lo solicite.
- Conservar la arquitectura React actual y no tocar base de datos, funciones, secretos ni infraestructura.

## Verificación
- Revisar la portada y la navegación en escritorio y móvil.
- Probar todos los anchors, el menú, la conversación de Matilda, formularios y enlaces principales.
- Ejecutar validación del proyecto, revisión de arquitectura y comprobación de cambios.
- Comparar visualmente la implementación final con la referencia adjunta.

## Riesgo y reversión
- Riesgo principal: legibilidad y rendimiento del fondo inmersivo en móvil. Se mitigará con recursos adaptados y una composición simplificada bajo 768 px.
- Reversión: los cambios estarán limitados a componentes y estilos de presentación de la landing, sin migraciones ni cambios de datos.
