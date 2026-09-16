# Actualizar el contenido comercial de la landing

## Alcance
Actualizar la landing actual con el contenido del documento, sin rediseñar, eliminar secciones ni cambiar la identidad visual. Todo el trabajo será exclusivamente de producto/frontend; no se tocarán backend, datos, autenticación, funciones, secretos ni infraestructura.

## Cambios propuestos

1. **Ajustar las secciones existentes**
   - Refinar **Problema** para mostrar los siete dolores solicitados, sin estadísticas no validadas.
   - Ampliar **Propuesta de valor** con los nueve elementos indicados.
   - Convertir **Solución** en la relación compacta “problema → respuesta de QubeSight”, manteniendo sus tarjetas, iconos, animaciones y cierre actual.

2. **Añadir tres secciones reutilizando el lenguaje visual actual**
   - **Capacidades:** una sola plataforma organizada en Voice AI, canales digitales, automatización e integraciones.
   - **Métricas:** separar métricas de uso y resultados de atención, sin números ni paneles ficticios.
   - **Implementación:** explicar la puesta en marcha acompañada como configuración de una plataforma estándar, no como software a medida.

3. **Integrarlas en la página y navegación**
   - Insertar las nuevas secciones dentro del flujo actual sin duplicar contenido existente.
   - Actualizar los enlaces del menú a: Problema, Solución, Capacidades, Métricas e Implementación.
   - Conservar el scroll suave, el indicador de sección activa y el comportamiento móvil existente.
   - Mantener Demo y Early Adopters en la página y accesibles mediante sus llamadas a la acción actuales, aunque no ocupen espacio adicional en el menú principal.

4. **Mantener contenido bilingüe y prudente**
   - Incorporar versión equivalente en español e inglés.
   - Aclarar que canales, métricas, cotizaciones e integraciones dependen de configuración y disponibilidad.
   - No prometer compatibilidad universal, resultados garantizados, capacidades ilimitadas ni desarrollo personalizado.

## Archivos previstos
- `src/components/sections/Problem.tsx`
- `src/components/sections/ValueProposition.tsx`
- `src/components/sections/Solution.tsx`
- Tres componentes pequeños nuevos para Capacidades, Métricas e Implementación
- `src/components/sections/PrototypeShellHome.tsx`
- `src/components/layout/Header.tsx`
- `src/lib/sectionNav.ts`
- `src/hooks/useTranslation.tsx`
- `src/test/sectionNav.test.ts`

No se modificarán los estilos globales ni se añadirán dependencias.

## Validación
- Ejecutar las validaciones del proyecto, pruebas de navegación y revisión de diferencias.
- Revisar visualmente desktop y móvil: orden, anchors, textos, desbordamientos y ausencia de duplicados.
- Confirmar que la apariencia global se mantiene intacta.

## Riesgos y mitigación
- **Menú demasiado ancho:** limitarlo a los cinco anchors solicitados y mantener Demo/Early Adopters en sus CTA actuales.
- **Página más extensa:** usar texto comercial breve y tarjetas compactas, sin repetir explicaciones.
- **Promesas prematuras:** usar lenguaje condicionado cuando una capacidad dependa de integración o configuración.

## Rollback
Revertir únicamente los componentes de contenido, la composición de la landing y el listado de anchors; no habrá cambios de datos ni infraestructura que deshacer.
