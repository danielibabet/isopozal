# IsoPozal - Diagramador de Arquitectura AWS 🇪🇸

<p align="center">
  <img src="banner.png" alt="IsoPozal Banner" width="100%"/>
</p>

<p align="center">
  <strong>Herramienta web gratuita y de código abierto para crear diagramas de arquitectura AWS</strong>
</p>

<p align="center">
  <a href="https://github.com/danielibabet/isopozal">
    <img src="https://img.shields.io/github/stars/danielibabet/isopozal?style=social" alt="GitHub stars"/>
  </a>
  <a href="https://github.com/danielibabet/isopozal/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"/>
  </a>
</p>

<p align="center">
  <a href="https://buymeacoffee.com/dibanezb" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174">
  </a>
</p>

---

## 📸 Capturas de Pantalla

<p align="center">
  <img src="isopozal-screenshot.png" alt="IsoPozal Screenshot" width="100%"/>
  <br/>
  <em>Interfaz principal de IsoPozal</em>
</p>

<p align="center">
  <img src="isopozal-demo.png" alt="IsoPozal Demo" width="100%"/>
  <br/>
  <em>Ejemplo de diagrama de arquitectura AWS</em>
</p>

## 🎯 ¿Qué es IsoPozal?

IsoPozal es una herramienta especializada para crear diagramas de arquitectura AWS de manera rápida, intuitiva y profesional. Basada en el excelente proyecto open source [FossFLOW](https://github.com/stan-smith/FossFLOW), IsoPozal está completamente adaptada para la comunidad hispanohablante con recursos oficiales de AWS.

### ✨ Características Principales

- **🎨 Iconos Oficiales AWS**: Set completo de iconos de arquitectura y recursos de AWS (Versión 2025.07.31)
- **🇪🇸 100% en Español**: Interfaz completamente traducida al español
- **📁 Categorías Organizadas**: Servicios organizados en categorías traducidas (Cómputo, Base de Datos, Redes, Analítica, etc.)
- **🌙 Tema Oscuro**: Interfaz profesional con paleta de colores oscuros optimizada
- **🔒 Privacidad Total**: Todo el procesamiento se realiza en el navegador. Sin servidores, sin tracking
- **💾 Múltiples Formatos**: Exporta tus diagramas como JSON, PNG, SVG o PDF
- **⚡ Rápido e Intuitivo**: Dibuja diagramas isométricos profesionales en minutos
- **📱 Progressive Web App**: Funciona offline una vez cargada

## 🚀 Inicio Rápido

### Opción 1: Usar Online (Recomendado)

Visita **[tu-url-de-deployment]** y empieza a crear diagramas inmediatamente.

### Opción 2: Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/danielibabet/isopozal.git
cd isopozal

# Instalar dependencias
npm install

# Construir la librería (requerido la primera vez)
npm run build:lib

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📖 Cómo Usar

### Crear Diagramas

1. **Añadir Componentes**:
   - Haz clic en el botón "+" en el menú superior derecho
   - Arrastra y suelta componentes desde la biblioteca a la izquierda
   - O haz clic derecho en el canvas y selecciona "Añadir nodo"

2. **Conectar Componentes**:
   - Selecciona la herramienta Conector (presiona 'C' o haz clic en el icono)
   - Haz clic en el primer nodo, luego en el segundo nodo
   - Personaliza las flechas con etiquetas, colores y estilos

3. **Personalizar**:
   - Haz clic en cualquier elemento para ver sus opciones
   - Cambia colores, tamaños, etiquetas y más
   - Añade cajas de texto para documentación adicional

4. **Guardar tu Trabajo**:
   - **Guardado Rápido**: Guarda en la sesión del navegador
   - **Exportar**: Descarga como archivo JSON
   - **Exportar Imagen**: Descarga como PNG, SVG o PDF

### Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl + Z` | Deshacer |
| `Ctrl + Y` / `Ctrl + Shift + Z` | Rehacer |
| `C` | Herramienta Conector |
| `T` | Herramienta Texto |
| `R` | Herramienta Rectángulo |
| `Delete` | Eliminar elemento seleccionado |
| `Espacio + Arrastrar` | Mover canvas |
| `Ctrl + Rueda` | Zoom |

## 🎨 Recursos Incluidos

- **307 Iconos de Servicios AWS** organizados en 24 categorías
- **Iconos de Arquitectura**: VPC, Subnets, Regiones, Zonas de Disponibilidad
- **Iconos de Recursos**: Instancias, Contenedores, Funciones Lambda, etc.
- **Glosario de Servicios**: Consulta [GLOSARIO_AWS.md](GLOSARIO_AWS.md) para descripciones de cada servicio

## 🔧 Estructura del Proyecto

Este es un monorepo que contiene dos paquetes:

- `packages/fossflow-lib` - Librería React para dibujar diagramas (construida con Webpack)
- `packages/fossflow-app` - Progressive Web App que envuelve la librería (construida con RSBuild)

### Comandos de Desarrollo

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run dev:lib      # Modo watch para desarrollo de librería

# Construcción
npm run build        # Construir librería y app
npm run build:lib    # Construir solo librería
npm run build:app    # Construir solo app

# Testing y Linting
npm test             # Ejecutar tests unitarios
npm run lint         # Verificar errores de linting
```

## 🆕 Cambios Respecto a FossFLOW Original

### ✅ Añadido

- **Traducción completa al español** de toda la interfaz
- **Iconos oficiales de AWS** (307 servicios)
- **Categorías en español** para servicios AWS
- **Glosario de servicios AWS** en español
- **Tema oscuro optimizado** para trabajo profesional
- **Búsqueda mejorada** de iconos con filtrado en tiempo real
- **Enlaces a recursos** (GitHub, Buy Me a Coffee)

### ❌ Eliminado

- Configuración de Docker (no necesaria para uso web)
- Tests E2E (simplificación del proyecto)
- Workflows de GitHub Actions originales
- Carpetas de SVG no utilizadas
- Documentación de contribución de FossFLOW
- Sistema de "Iconos Usados Recientemente"
- Funcionalidad de importar iconos personalizados

### 🔄 Modificado

- **Nombre del proyecto**: FossFLOW → IsoPozal
- **Versión**: 1.0.0 (reinicio de versionado)
- **Repositorio**: https://github.com/danielibabet/isopozal
- **Idioma por defecto**: Español (era inglés)
- **Nombre de exportación**: isopozal-export (era fossflow-export)

## 📚 Documentación Adicional

- [GLOSARIO_AWS.md](GLOSARIO_AWS.md) - Glosario de servicios AWS en español
- [README-FossFlow.md](README-FossFlow.md) - README original de FossFLOW

## 🙏 Créditos

IsoPozal está basado en [FossFLOW](https://github.com/stan-smith/FossFLOW) creado por [@stan-smith](https://github.com/stan-smith).

FossFLOW a su vez está construido sobre la librería [Isoflow](https://github.com/markmanx/isoflow) creada por [@markmanx](https://github.com/markmanx).

Los iconos de AWS son propiedad de Amazon Web Services y se utilizan bajo sus términos de uso.

### Apoya el Proyecto Original

Si te ha gustado IsoPozal, considera apoyar también a los creadores originales:

- **FossFLOW**: [Buy Me a Coffee](https://www.buymeacoffee.com/stan.smith) | [Ko-fi](https://ko-fi.com/P5P61KBXA3)

## 💖 Apoya IsoPozal

Si IsoPozal te ha sido útil, considera invitarme a un café:

<a href="https://buymeacoffee.com/dibanezb" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174">
</a>

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

---

<p align="center">
  Hecho con ❤️ para la comunidad hispanohablante de AWS
</p>

<p align="center">
  <a href="https://github.com/danielibabet/isopozal">⭐ Dale una estrella en GitHub</a>
</p>
