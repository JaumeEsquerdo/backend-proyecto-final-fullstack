import { Router } from "express";
import { createRecomendacion, getRecomendacionById, getRecomendaciones, updateRecomendacion, deleteRecomendacion } from "../controllers/actividadesRecomendadas.controller.js";

import { authMiddleWare } from "../middleware/auth.middleware.js";
import {isAdmin} from '../middleware/role.middleware.js'

const router = Router();

//proteger todas las rutas: solo accedes con admin autentificado
router.use(authMiddleWare, isAdmin);

// rutas de geestion de actividades recomendadas (admin)
router.post("/", createRecomendacion) //crear recomendacion..
router.get("/", getRecomendaciones)
router.get('/:id', getRecomendacionById)
router.put("/:id", updateRecomendacion)
router.delete("/:id", deleteRecomendacion)

export default router;