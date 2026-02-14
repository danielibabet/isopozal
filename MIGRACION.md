# Guía de Migración a Nuevo Repositorio

Esta guía te ayudará a migrar el proyecto al nuevo repositorio `isopozal`.

## Pasos para la Migración

### 1. Crear el Nuevo Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `isopozal`
3. Descripción: "Herramienta de diagramas de arquitectura AWS en español"
4. Público o Privado (según prefieras)
5. **NO** inicialices con README, .gitignore o licencia (ya los tienes)
6. Haz clic en "Create repository"

### 2. Preparar el Repositorio Local

```bash
# Asegúrate de estar en la rama principal
git checkout main  # o master, según tu configuración

# Añade todos los cambios
git add .

# Haz commit de los cambios finales
git commit -m "chore: preparación para migración a isopozal"
```

### 3. Cambiar el Remote

```bash
# Elimina el remote actual
git remote remove origin

# Añade el nuevo remote
git remote add origin https://github.com/danielibabet/isopozal.git

# Verifica que el remote se añadió correctamente
git remote -v
```

### 4. Push al Nuevo Repositorio

```bash
# Push de la rama principal
git push -u origin main  # o master

# Push de todas las ramas (si tienes más)
git push --all origin

# Push de todos los tags (si tienes)
git push --tags origin
```

### 5. Verificación

1. Ve a https://github.com/danielibabet/isopozal
2. Verifica que todos los archivos estén presentes
3. Verifica que el README.md se muestre correctamente
4. Verifica que los enlaces funcionen

### 6. Actualizar Enlaces Locales

Si tienes otros proyectos o documentos que referencian el repositorio antiguo, actualízalos:

- Antiguo: `https://github.com/danielibabet/aws-diagrams`
- Nuevo: `https://github.com/danielibabet/isopozal`

### 7. Configurar GitHub Pages (Opcional)

Si quieres desplegar la aplicación en GitHub Pages:

1. Ve a Settings → Pages en tu repositorio
2. Source: Deploy from a branch
3. Branch: Selecciona `main` (o `gh-pages` si creas una rama específica)
4. Folder: `/root` o `/docs` según tu configuración
5. Save

### 8. Limpiar Repositorio Antiguo (Opcional)

Si quieres mantener el repositorio antiguo como archivo:

1. Ve a https://github.com/danielibabet/aws-diagrams
2. Settings → General → Danger Zone
3. Archive this repository
4. O añade un README indicando que el proyecto se movió:

```markdown
# ⚠️ Este repositorio se ha movido

Este proyecto ahora se encuentra en:
https://github.com/danielibabet/isopozal

Por favor, actualiza tus enlaces y clones.
```

## Archivos Actualizados

Los siguientes archivos ya han sido actualizados con el nuevo nombre del repositorio:

- ✅ `README.md` - Documentación principal
- ✅ `package.json` - Configuración del monorepo
- ✅ `packages/fossflow-lib/package.json` - Configuración de la librería
- ✅ `packages/fossflow-lib/src/components/HelpDialog/HelpDialog.tsx` - Enlace de GitHub en la app
- ✅ `.gitignore` - Mejorado y actualizado

## Limpieza Realizada

Se han eliminado los siguientes archivos/carpetas innecesarios:

- ❌ Archivos de Docker (compose.yml, Dockerfile, etc.)
- ❌ Carpeta `svg/`
- ❌ Carpeta `pngs-with-block/`
- ❌ Carpeta `e2e-tests/`
- ❌ Archivos de testing temporales
- ❌ Documentación de FossFLOW original
- ❌ `.github/` workflows
- ❌ `.releaserc.json`

## Problemas Comunes

### Error: "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/danielibabet/isopozal.git
```

### Error: "failed to push some refs"

```bash
# Si el repositorio remoto tiene commits que no tienes localmente
git pull origin main --rebase
git push -u origin main
```

### Error: "Permission denied"

Asegúrate de tener permisos de escritura en el repositorio y que tu autenticación de GitHub esté configurada correctamente.

## Siguiente Paso

Una vez completada la migración, puedes eliminar este archivo:

```bash
git rm MIGRACION.md
git commit -m "docs: eliminar guía de migración"
git push
```

---

¡Buena suerte con la migración! 🚀
