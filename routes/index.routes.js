import { Router } from "express" //importar libreria
import authRoutes from './auth.routes.js'
import adminRoutes from './role.routes.js'
import {asignarRolAdmin, createUsuario, getUsuario, updatePassword, updateUserData, updateUsuario} from "../controllers/usuarios.controller.js"
import { createActividad, getActividades, getActividadById, updateActividad, deleteActividad } from "../controllers/actividad.controller.js"
import recomendacionRoutes from './recomendaciones.routes.js'
import PackRoutes from './pack.routes.js'
import { authMiddleWare } from "../middleware/auth.middleware.js"
import { isAdmin } from "../middleware/role.middleware.js"

const router = Router()


// rutas de autentificacion
router.use('/auth', authRoutes) // rutas de autentificacion... (/api/v1/auth) 

// rutas de roles
router.use('/admin',adminRoutes)

//usuarios
router.get("/usuarios/:id", getUsuario)
router.post("/usuarios", createUsuario)
router.put("/usuarios/:id", updateUsuario)
router.put("/usuarios/:id/datos", updateUserData)
router.put("/usuarios/:id/password", updatePassword)

// rutas de actividades en calendario
router.post("/actividades",authMiddleWare, createActividad) //crear nueva actividad
router.get("/actividades", getActividades) // obtener todas
router.get("/actividades/:id", getActividadById) //obtener una actividad por ID
router.put("/actividades/:id", updateActividad)
router.delete("/actividades/:id", deleteActividad)



// rutas para gestion de actividades recomendadas de gestion rol 'admin' /api/v1/recomendaciones
router.use('/recomendaciones', recomendacionRoutes) 

// rutas de packs recomendadas
router.use('/packs', PackRoutes)


//rutas protegias con auth y accesible paara admin
router.put("/usuarios/:id/admin", authMiddleWare, asignarRolAdmin)






export default router;