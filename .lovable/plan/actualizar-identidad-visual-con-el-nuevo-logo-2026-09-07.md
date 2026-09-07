# Actualizar identidad visual con el nuevo logo

## Alcance
- Subir el logo proporcionado al flujo de recursos del proyecto.
- Sustituir el cubo animado actual por la nueva marca en el menú, pie de página, acceso y pantalla de prueba del logo.
- Incorporar la marca en el menú lateral del dashboard, manteniendo el texto “QubeSight”.
- Generar un favicon cuadrado y optimizado a partir del mismo archivo, reemplazando el favicon anterior.

## Implementación
- Mantener `LogoCube` como componente compartido para evitar cambios amplios, pero reemplazar su dibujo anterior por la nueva imagen y conservar proporciones legibles.
- Ajustar únicamente los contenedores que necesiten más ancho o altura para que la marca no se corte.
- No modificar contenido, navegación, backend, datos ni funciones.

## Validación
- Comprobar menú, pie, acceso y dashboard en escritorio y móvil.
- Confirmar que el favicon nuevo carga y que no hay cortes, desbordamientos ni errores de consola.
- Ejecutar las validaciones de TypeScript/build pertinentes.
