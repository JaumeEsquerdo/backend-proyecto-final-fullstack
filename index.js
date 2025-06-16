import express from 'express';

import { PORT, DOMAIN } from './config/config.js' //config

import { conectarDB } from './db/mongoose.js'

import cors from 'cors' //para q funcione el fetch a un front
import router from './routes/index.routes.js';

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"


const app = express();

app.use(cors()); //conectar desde cualquier conexión
app.use(express.json()) //leer datos que vienen en el body de mi request
app.use(express.urlencoded({ extended: true })) // nos permite leer datos desde formularios HTML

conectarDB();

// Rutas front
console.clear();
app.get("/", (req, res) => {

    res.send('Bienvenidos a mi API de gestión de actividades para "Turistea Villajoyosa"')

})

// rutas de la API
app.use("/api/v1", router)

// manejador de errores
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ msg: 'Error  interno del servidor' })
})

// Puerto
app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${DOMAIN}:${PORT}`)
})
