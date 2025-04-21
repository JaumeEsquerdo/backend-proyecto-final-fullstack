import { Router } from "express" //importar libreria
import authRoutes from './auth.routes.js'
import {createUsuario, getUsuario, updateUsuario} from "../controllers/usuarios.controller.js"


const router = Router()


// auth
router.use('/auth', authRoutes) // rutas de autentificacion... (/api/v1/auth) 

//usuarios
router.get("/usuarios/:id", getUsuario)
router.post("/usuarios", createUsuario)
router.put("/usuarios/:id", updateUsuario)



export default router;