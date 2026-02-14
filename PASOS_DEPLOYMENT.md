# Pasos para Activar GitHub Pages

## Resumen Rápido

Sigue estos pasos para tener IsoPozal funcionando en https://danielibabet.github.io/isopozal

### 1. Push de los cambios

```bash
git add .
git commit -m "feat: configurar GitHub Pages con deployment automático"
git push origin main
```

### 2. Configurar GitHub Pages

1. Ve a: https://github.com/danielibabet/isopozal/settings/pages
2. En **"Source"**, selecciona: **GitHub Actions**
3. ¡Listo! No necesitas hacer nada más.

### 3. Esperar el deployment

1. Ve a: https://github.com/danielibabet/isopozal/actions
2. Verás un workflow ejecutándose llamado "Deploy to GitHub Pages"
3. Espera 2-3 minutos a que termine
4. Una vez completado (✓ verde), tu sitio estará en: https://danielibabet.github.io/isopozal

## ¿Qué se ha configurado?

✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
✅ Configuración de RSBuild para GitHub Pages
✅ Archivo `.nojekyll` para evitar procesamiento de Jekyll
✅ Variable `PUBLIC_URL` para rutas correctas
✅ Script de build específico para GitHub Pages

## Actualizaciones Futuras

Cada vez que hagas push a `main`, el sitio se actualizará automáticamente:

```bash
git add .
git commit -m "tu mensaje"
git push
```

## Verificación

Una vez desplegado, verifica:
- ✅ El sitio carga: https://danielibabet.github.io/isopozal
- ✅ Los iconos AWS se ven correctamente
- ✅ Puedes crear y exportar diagramas
- ✅ El tema oscuro funciona

---

**¡Eso es todo!** Tu aplicación estará disponible públicamente en GitHub Pages.
