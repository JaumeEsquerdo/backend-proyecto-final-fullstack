import { JWT_SECRET } from "../config/config.js";

import jwt from 'jsonwebtoken';

export const authMiddleWare = (req, res, next) => {
    // Opción 1
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: "acceso denegado, token requerido" });
    }

    try {
        // verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log('Token decodificado:', decoded); // Verificar el contenido del token

        req.user =
        {
            userId: decoded.userId,
            name: decoded.name,
            role: decoded.role
            // guardo infoextraido del token en el request
        }
        next();
        // req.userId se obtiene del token descifrado y solo existe durante la petición. No se almacena en el token ni en la base de datos.


    } catch (err) {
        console.error("error en el token", err)
        res.status(401).json({ message: "Acceso denegado. Token inválido o expirado" })
    }
}