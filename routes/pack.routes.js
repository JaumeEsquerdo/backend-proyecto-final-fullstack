import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";
import { createPack, deletePack, getPackById, getPacks, updatePack } from "../controllers/packActividad.controller.js";


const router = Router();


// rutas publicas
router.get("/packs", getPacks);
router.get("/packs/:id", getPackById);


//Rutas protegidas para admin
router.post("/packs", authMiddleWare, isAdmin, createPack);
router.delete("/packs/:id", authMiddleWare, isAdmin, deletePack);
router.put("/packs/:id", authMiddleWare, isAdmin, updatePack);











export default router;