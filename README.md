# 🏛 Proyecto Final Fullstack CEI — Backend (API)

Backend del proyecto final del módulo FullStack en CEI Valencia para el funcionamiento de la app `Turistea Villajoyosa`: la app muestra en la home actividades recomendadas en Villajoyosa y permite al usuario añadir también sus propias actividades a un calendario personalizado.

- API para la app del Proyecto Final Fullstack: gestión de usuarios y actividades.
Despliegue: https://backend-proyecto-final-fullstack.vercel.app

Repo: https://github.com/JaumeEsquerdo/backend-proyecto-final-fullstack

## 📖 Descripción

CRUD de usuarios, actividades guardaddas, actividades recomendadas y pack de actividades.

Autenticación mediante JWT.

Endpoints protegidos con middleware.

Subida de imágenes con Multer.

Despliegue en Vercel.

## 🧱 Tech stack

Node.js · Express · MongoDB/Mongoose · JWT · Multer · Dotenv · CORS

## 🔑 Variables de entorno

El archivo .env.copy incluye la estructura necesaria (puerto, conexión a DB, clave JWT, etc.).

## 🧰 Scripts
```js
npm install
npm run dev      // local
```
- Y descomentar en index.js
```js
// Puerto PARA LOCAL
// app.listen(PORT, () => {
//     console.log(`Servidor funcionando en ${DOMAIN}:${PORT}`)
// })
```

## ✍️ Autor

- Jaume Esquerdo · [LinkedIn](https://www.linkedin.com/in/jaume-esquerdo/) · [GitHub](https://github.com/JaumeEsquerdo)