# Changelog

Todos los cambios notables de IsoPozal se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2026-02-14

### Lanzamiento Inicial de IsoPozal

IsoPozal es un fork de FossFLOW completamente adaptado para la comunidad hispanohablante de AWS.

### Añadido

- **Traducción completa al español** de toda la interfaz usando i18next
- **307 iconos oficiales de AWS** organizados en 24 categorías
- **Categorías en español** para servicios AWS (Cómputo, Base de Datos, Redes, etc.)
- **Glosario de servicios AWS** en español (GLOSARIO_AWS.md)
- **Tema oscuro optimizado** para trabajo profesional
- **Búsqueda mejorada** de iconos con filtrado en tiempo real
- **Service Worker** para funcionamiento offline como PWA
- **Selector rápido de iconos** en controles de nodo
- **Migración a RSBuild/RSLib** desde Webpack para mejor rendimiento
- **React 19** actualizado desde React 18
- **Exportación múltiple**: JSON, PNG, SVG y PDF

### Modificado

- **Nombre del proyecto**: FossFLOW → IsoPozal
- **Repositorio**: https://github.com/danielibabet/isopozal
- **Idioma por defecto**: Español (era inglés)
- **Nombre de exportación**: isopozal-export (era fossflow-export)
- **Build tools**: Webpack → RSBuild/RSLib
- **Paleta de colores**: Tema oscuro profesional optimizado

### Eliminado

- Configuración de Docker (no necesaria para uso web)
- Tests E2E (simplificación del proyecto)
- Workflows de GitHub Actions originales
- Carpetas de SVG no utilizadas
- Sistema de "Iconos Usados Recientemente"
- Funcionalidad de importar iconos personalizados
- Backend de Node.js (no necesario para PWA)
- Idiomas adicionales (solo español en v1.0.0)

### Créditos

IsoPozal está basado en [FossFLOW](https://github.com/stan-smith/FossFLOW) v1.10.4 creado por [@stan-smith](https://github.com/stan-smith).

---

## Historial de FossFLOW (Proyecto Original)

Para ver el historial completo de cambios del proyecto original FossFLOW, visita:
https://github.com/stan-smith/FossFLOW/blob/main/CHANGELOG.md
