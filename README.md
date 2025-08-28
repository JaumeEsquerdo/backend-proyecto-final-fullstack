# 🏛 Proyecto Final Fullstack CEI — Backend (API)

Backend del proyecto `Turistea Villajoyosa`, desarrollado como proyecto final del módulo FullStack en CEI Valencia. Proporciona la API que gestiona usuarios, actividades recomendadas, packs y actividades personalizadas del calendario.

- API para la app del Proyecto Final Fullstack: gestión de usuarios y actividades.
Despliegue: https://backend-proyecto-final-fullstack.vercel.app

Repo: https://github.com/JaumeEsquerdo/backend-proyecto-final-fullstack

## 📖 Descripción

CRUD de usuarios, actividades guardadas, actividades recomendadas y pack de actividades.

Autenticación mediante JWT.

Endpoints protegidos con middleware.

Subida de imágenes con Multer.

Despliegue en Vercel.

## 🧱 Tech stack

Back: Node.js + Express + MongoDB/Mongoose (API) + JWT  Multer + Dotenv + CORS

## 🔑 Variables de entorno

El archivo .env.copy incluye la estructura necesaria (puerto, conexión a DB, clave JWT, etc.).

## 🧰 Scripts
```js
npm install
npm run dev      // local
```
- Y descomentar en index.js solo para arrancarlo en local.  Para el despliegue en Vercel, debe mantenerse exportado (sin `listen`).
```js
// Puerto PARA LOCAL
// app.listen(PORT, () => {
//     console.log(`Servidor funcionando en ${DOMAIN}:${PORT}`)
// })
```

## ✍️ Autor

- Jaume Esquerdo · [LinkedIn](https://www.linkedin.com/in/jaume-esquerdo/) · [GitHub](https://github.com/JaumeEsquerdo)