import express from 'express'
import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/auth.controller.js'
import { authMiddleWare } from '../middleware/auth.middleware.js'

const authRoutes = Router();

// Registro
authRoutes.post('/registro', registerUser);

// login
authRoutes.post('/login', loginUser);

// obtener usuario actual (con el token)
authRoutes.get('/me', authMiddleWare, getCurrentUser);

export default authRoutes;
