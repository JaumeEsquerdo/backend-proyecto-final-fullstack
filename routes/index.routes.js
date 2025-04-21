import { Router } from "express" //importar libreria

import {createUsuario, getUsuario, updateUsuario} from "../controllers/usuarios.controller.js"


const router = Router()




//usuarios
router.get("/usuarios/:id", getUsuario)
router.post("/usuarios", createUsuario)
router.put("/usuarios/:id", updateUsuario)

export default router;