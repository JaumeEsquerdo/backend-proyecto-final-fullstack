import { Actividad } from "../db/models/actividad.model.js"
import { Usuario } from "../db/models/usuario.model.js";

const responseAPI = {
    msg: "",
    data: [],
    status: "ok", //error
    cant: null,
}

export const createActividad = async (req, res, next) => {
    const { title, time, timeExact, displayHours, description } = req.body;

    const userId = req.user?.userId; //obtengo el user del token, segun lo guardo en auth.middleware.js
    // console.log('usuario en back:', userId)

    if (!title || !time || !timeExact || !userId) {
        responseAPI.msg = 'faltan campos (title, time, timeExact o user)'
        responseAPI.status = 'error'
        return res.status(400).json(responseAPI)
    }



    try {
        const nuevaActividad = await Actividad.create({
            title,
            time,
            timeExact,
            displayHours,
            description,
            user: userId
        })
        // console.log('Actividad creada:', nuevaActividad); // Verifica la actividad creada
        const user = await Usuario.findById(userId)
        user.actividades.push(nuevaActividad._id) //agrega el id de la actividad al array de actividades
        await user.save()

        responseAPI.msg = 'Actividad creada correctamenet';
        responseAPI.data = nuevaActividad;
        responseAPI.status = 'ok';

        res.status(201).json(responseAPI)
    } catch (err) {
        console.error("Error al crear la actividad", err)
        next(err);
    }
};

//obtener todas las actividades
export const getActividades = async (req, res, next) => {
    try {

        const actividades = await Actividad.find()

        responseAPI.msg = 'Actividades obtenidas correctamente'
        responseAPI.status = 'ok'
        responseAPI.data = actividades

        res.status(200).json(responseAPI)

    } catch (err) {
        console.error('Error al obtener todas las actividades', err);
        next(err);
    }
}

// obtener una sola actividad
export const getActividadById = async (req, res, next) => {
    const { id } = req.params

    try {
        const actividad = await Actividad.findById(id)

        if (!actividad) {
            responseAPI.msg = 'Actividad no encontrada'
            responseAPI.status = 'error'
            return res.status(404).json(responseAPI)
        }

        responseAPI.msg = 'Actividad encontada'
        responseAPI.data = actividad
        responseAPI.status = 'ok'

        res.status(200).json(responseAPI)

    } catch (err) {
        console.error('error al obtener la actividad', err);
        next(err);
    }
}

//actualizar una actividad
export const updateActividad = async (req, res, next) => {
    const { id } = req.params;
    const { title, time, timeExact, displayHours, description } = req.body;

    if (!title || !time || !timeExact) {
        responseAPI.msg = 'faltan campos (title, time, timeExact)'
        responseAPI.status = 'error'
        return res.status(400).json(responseAPI)
    }

    try {
        const actividadActualizada = await Actividad.findByIdAndUpdate(
            id,
            { title, time, timeExact, displayHours, description },
            { new: true }
        );

        if (!actividadActualizada) {
            responseAPI.msg = 'actividad no encontrada';
            responseAPI.status = 'error';
            return res.status(404).json(responseAPI);
        }

        responseAPI.msg = 'actividad actualizada correctamente';
        responseAPI.data = actividadActualizada;
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (err) {
        console.error('error al actualizar la actividad', err);
        next(err);
    }

}

//eliminar una actividad
export const deleteActividad = async (req, res, next) => {
    const { id } = req.params;

    try {
        const actividadEliminada = await Actividad.findByIdAndDelete(id);

        if (!actividadEliminada) {
            responseAPI.msg = 'actividad no encontrada';
            responseAPI.status = 'error';
            return res.status(404).json(responseAPI);
        }

        responseAPI.msg = 'actividad eliminada correctamente';
        responseAPI.data = actividadEliminada;
        responseAPI.status = "ok";

        res.status(200).json(responseAPI)
    } catch (err) {
        console.error('error al eliminar actividad', err);
        next(err);
    }
}

// obtener actividades del usuer autentificado!! IMPORTANTE
export const getUserActivities = async (req, res, next) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            responseAPI.msg = 'No autorizado';
            responseAPI.status = 'error';
            return res.status(401).json(responseAPI)
        }

        const actividades = await Actividad.find({ user: userId }).sort({ time: 1 })

        responseAPI.msg = 'Actividades del usuario obtenidas correctamente';
        responseAPI.status = 'ok';
        responseAPI.data = actividades;

        res.status(200).json(responseAPI)
    } catch (err) {
        console.error('error al obtener actividades del usuario', err)
        next(err);
    }
}