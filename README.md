# Teresa Turégano — sitio web

Sitio estático (HTML + CSS + JS, sin dependencias ni build). Listo para GitHub y Vercel.

## Estructura

```
index.html        Home: intro con logo → vídeo a pantalla completa → About / Design / Styling
about.html        About
design.html       Teresa Turégano Estudio (2019) · Emestudios (2025)
styling.html      Proyecto destacado (Aitana) · Editoriales · Videoclips · Alfombras rojas
assets/css/style.css
assets/js/main.js
assets/img/       logo-negro.png, logo-blanco.png, favicon.png
assets/img/collections/  portadas de las colecciones
vercel.json       URLs limpias (/about, /design, /styling)
```

## Sustituir contenido

- **Portada de la home:** `assets/img/home/home-cover.jpg` (y `home-cover-1200.jpg` para móvil).
- **Imágenes:** ahora son de ejemplo (`picsum.photos`). Guarda las reales en `assets/img/` y cambia el `src`
  (ej. `assets/img/design/estudio-coleccion-01.jpg`). Formato vertical 3:4 para las tarjetas.
- **Colecciones:** en `design.html`, duplica un bloque `<a class="card">…</a>` por colección.
- **Instagram / email:** en el pie de cada página y en `about.html`.

La intro del logo se muestra una vez por sesión (al volver a la home no se repite).

## Publicar

1. Crea un repositorio en GitHub y sube esta carpeta:
   ```bash
   git init && git add . && git commit -m "Primera versión"
   git branch -M main
   git remote add origin https://github.com/USUARIO/teresa-turegano.git
   git push -u origin main
   ```
2. En vercel.com → **Add New → Project** → importa el repositorio.
   Framework preset: **Other**. Sin build command. **Deploy**.
3. Cada `git push` vuelve a publicar automáticamente.

Vista local: abre `index.html` en el navegador, o `npx serve .`
