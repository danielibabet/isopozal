# Guía de Deployment a GitHub Pages

Esta guía explica cómo desplegar IsoPozal en GitHub Pages.

## Configuración Automática (Recomendado)

El proyecto ya está configurado con GitHub Actions para deployment automático. Solo necesitas habilitar GitHub Pages en tu repositorio.

### Pasos:

1. **Push del código al repositorio**

```bash
git add .
git commit -m "feat: configurar GitHub Pages deployment"
git push origin main
```

2. **Habilitar GitHub Pages**

   - Ve a tu repositorio en GitHub: https://github.com/danielibabet/isopozal
   - Click en **Settings** (Configuración)
   - En el menú lateral, click en **Pages**
   - En **Source**, selecciona **GitHub Actions**
   - Guarda los cambios

3. **Esperar el deployment**

   - Ve a la pestaña **Actions** en tu repositorio
   - Verás un workflow llamado "Deploy to GitHub Pages" ejecutándose
   - Espera a que termine (toma unos 2-3 minutos)
   - Una vez completado, tu sitio estará disponible en: https://danielibabet.github.io/isopozal

## Deployment Manual (Alternativo)

Si prefieres hacer el deployment manualmente:

### Opción 1: Usando gh-pages branch

```bash
# Instalar gh-pages
npm install -g gh-pages

# Build del proyecto
npm run build:lib
npm run build:app

# Deploy
gh-pages -d packages/fossflow-app/dist
```

### Opción 2: Usando GitHub CLI

```bash
# Build del proyecto
npm run build:lib
npm run build:app

# Deploy usando gh CLI
gh workflow run deploy.yml
```

## Verificación

Una vez desplegado, verifica que:

1. El sitio carga correctamente en https://danielibabet.github.io/isopozal
2. Los iconos de AWS se muestran correctamente
3. La funcionalidad de exportar/importar funciona
4. El Service Worker se registra correctamente (para PWA)

## Troubleshooting

### El sitio muestra una página en blanco

- Verifica que `PUBLIC_URL=/isopozal` esté configurado en el workflow
- Revisa la consola del navegador para errores de rutas
- Asegúrate de que el archivo `.nojekyll` esté en la carpeta dist

### Los assets no cargan (404)

- Verifica que `assetPrefix` esté configurado correctamente en `rsbuild.config.ts`
- Asegúrate de que todas las rutas en el código usen rutas relativas o `process.env.PUBLIC_URL`

### El workflow falla

- Revisa los logs en la pestaña Actions
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que los permisos de GitHub Actions estén habilitados

## Actualizar el Sitio

Cada vez que hagas push a la rama `main`, el sitio se actualizará automáticamente:

```bash
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
```

El workflow se ejecutará automáticamente y desplegará los cambios en unos minutos.

## Dominio Personalizado (Opcional)

Si quieres usar un dominio personalizado:

1. Ve a **Settings** → **Pages** en tu repositorio
2. En **Custom domain**, ingresa tu dominio (ej: `isopozal.com`)
3. Configura los DNS de tu dominio:
   - Tipo: `CNAME`
   - Nombre: `www` (o `@` para apex domain)
   - Valor: `danielibabet.github.io`
4. Espera a que se verifique el dominio (puede tomar hasta 24 horas)

## Monitoreo

Para ver el estado del deployment:

- **Actions**: https://github.com/danielibabet/isopozal/actions
- **Environments**: https://github.com/danielibabet/isopozal/deployments

---

¡Tu aplicación IsoPozal ahora está disponible públicamente en GitHub Pages!
