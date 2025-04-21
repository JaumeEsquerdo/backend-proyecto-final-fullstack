import { Usuario } from '../db/models/usuario.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../config/config.js'

const responseAPI = {
    msg: "",
    data: [],
    status: "ok", //error
    cant: null,
}

export const registerUser = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            responseAPI.msg = 'Faltan campos requeridos';
            responseAPI.status = "error";
            return res.status(400).json(responseAPI)
        }


        const existingUser = await Usuario.findOne({ email })

        if (existingUser) {
            responseAPI.msg = "El usuario con ese email ya existe, prueba otro";
            responseAPI.status = "error";
            return res.status(400).json(responseAPI)
        }

        //encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new Usuario({
            email,
            password: hashedPassword,
            name
        });

        await newUser.save();

        // Generar nuevo token JWT (datos, clave secreta, configuraciones especiales)
        const token = jwt.sign(
            {
                userId: newUser._id,
                name: newUser.name
            },

            JWT_SECRET,

            { expiresIn: '3h' }
        );

        responseAPI.msg = "Usuario creado correctamente";
        responseAPI.status = "ok";
        responseAPI.data = {
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        }

        res.status(201).json(responseAPI)

    } catch (err) {
        console.error('Error en el registro de usuario', err)
        next(err)
    }
}


export const loginUser = async (req, res, next) =>{
    try{

        const {email, password} = req.body;

        if(!email || !password){
            responseAPI.msg= " Email y contraseña son obligatorias"
            responseAPI.status= 'Error'
            return res.status(400).json(responseAPI)
        }

        const existingUser = await Usuario.findOne({email});

        if(!existingUser){
            responseAPI.msg = "Email o contraseña inválidos";
            responseAPI.status = "error";
            return res.status(401).json(responseAPI)
        }

        // Comparar password encriptada
        const isPasswrodValid = await bcrypt.compare(password, existingUser.password)

        if(!isPasswrodValid){
            responseAPI.msg = "Email o contraseña inválidos";
            responseAPI.status = "error";
            return res.status(401).json(responseAPI)
        }

        // crear token si la contraseña es valida
        const token = jwt.sign(
            {
                userId: existingUser._id,
                name: existingUser.name
            },
            JWT_SECRET,
            {expiresIn: '3h'}
        );

        responseAPI.msg = 'Usuario logueado correctamente';
        responseAPI.status = "ok";
        responseAPI.data = {
            token,
            user:{
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            }
        }

        res.status(200).json(responseAPI)

    }catch(err){
        console.error('Error en el loginUser', err)
        next(err)
    }
}