import { Usuario } from '../db/models/usuario.model.js'
import bcrypt, { hash } from 'bcrypt'

const responseAPI = {
    msg: "",
    data: [],
    status: "ok", //error
    cant: null,
}


// obtener usuario por id
export const getUsuario = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await Usuario.findById(id);

        if (!user) {
            responseAPI.msg = "Usuario no encontrado";
            responseAPI.status = "error";
            return res.status(404).json(responseAPI);
        }

        responseAPI.msg = "Usuario encontrado";
        responseAPI.data = user;
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error('Error al obtener usuario', err)
    }
}

// crear nuevo usuario
export const createUsuario = async (req, res, next) => {
    const { name, email, password } = req.body

    try {

        //primero verifico si email ya existe o no
        const existingUser = await Usuario.findOne({email})

        if(existingUser){
            responseAPI.msg = "El correo electrónico ya está registroado"
            responseAPI.status= "error"

            return res.status(400).json(responseAPI)
        }


        const newUser = await Usuario.create({ name, email, password })

        responseAPI.msg = 'Usuario creado correctamente'
        responseAPI.data = newUser;
        responseAPI.status = 'ok'

        res.status(201).json(responseAPI)

    } catch (err) {
        console.error('Error al crear usuario', err)
        next(err)
    }
}

// actualizar usuario
export const updateUsuario = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {


        const updateData = { name, email }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            updateData.password = hashedPassword;
        }





        const updateUser = await Usuario.findByIdAndUpdate(
            id,
            updateData
            ,
            { new: true }
        );

        if (!updateUser) {
            responseAPI.msg = 'No se encontró el usuario'
            responseAPI.status = 'error'
            return res.status(404).json(responseAPI)
        }

        responseAPI.msg = 'usuario actualizado';
        responseAPI.data = {
            id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email
        };
        responseAPI.status = 'ok'

        res.status(200).json(responseAPI)

    } catch (err) {
        console.error('erro en updateUsuario', err)
        next(err)
    }
}

// eliminar usuario
export const deleteUsuario = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleteUser = await Usuario.findByIdAndDelete(id);

        if (!deleteUser) {
            responseAPI.msg = `No se ha encontrado usuario con id ${id}`
            responseAPI.status = 'error'
            return res.status(404).json(responseAPI)
        }

        responseAPI.msg = `usuario con id ${id} eliminado`
        responseAPI.data = deleteUser;
        responseAPI.status = 'ok'

        res.status(200).json(responseAPI)
    } catch (err) {
        console.error('error en deleteusuario', err)
        next(err)
    }
}