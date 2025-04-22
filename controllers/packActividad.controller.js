import { PackActividad } from "../db/models/packActividad.model.js"

const responseAPI = {
    msg: "",
    data: [],
    status: "ok", //error
    cant: null,
}

//crear nuevo pack de actividades
export const createPack = async (req, res, next) => {
    const { nombre, tipo, color, actividades } = req.body;

    try {
        const nuevoPack = await PackActividad.create({ nombre, tipo, color, actividades });

        responseAPI.msg = 'pack creado correctamente';
        responseAPI.data = nuevoPack;
        res.status(201).json(responseAPI);

    } catch (err) {
        console.error('error al crear pack de actividades', err);
        next(err);
    }
}

//obtener todos los packs de actividades
export const getPacks = async (req, res, next) => {
    try {
        const packs = await PackActividad.find();

        responseAPI.msg = 'packs de actividades obtenidos';
        responseAPI.data = packs;
        res.status(200).json(responseAPI);

    } catch (err) {
        console.error('error al crear pack de actividades', err);
        next(err);
    }
}

// obtener pack de actividades por id
export const getPackById = async (req, res, next) => {
    const { id } = req.params;

    try {

        const pack = await PackActividad.findById(id).populate("actividades")

        if (!pack) {
            responseAPI.msg = 'pack de actividades no encontrado';
            responseAPI.status = 'error';
            return res.status(404).json(responseAPI)
        }

        responseAPI.msg = 'pack de actividades encontrado';
        responseAPI.data = pack;
        res.status(200).json(responseAPI)


    } catch (err) {
        console.error('error al crear pack de actividades', err);
        next(err);
    }
}

//actualizar un pack de actividades
export const updatePack = async (req, res, next) => {
    const { id } = req.params;
    const { nombre, tipo, color, actividades } = req.body;

    try {


        const packActualizado = await PackActividad.findByIdAndUpdate(
            id,
            { nombre, tipo, color, actividades },
            { new: true }
        );

        if (!packActualizado) {
            responseAPI.msg = 'pack de actividades no encontrado';
            responseAPI.status = 'error';
            return res.status(404).json(responseAPI);
        }

        responseAPI.msg = 'pack de actividades actualizado';
        responseAPI.data = packActualizado;
        res.status(200).json(responseAPI);

    } catch (err) {
        console.error('error al crear pack de actividades', err);
        next(err);
    }
}


// eliminar pack de actividades
export const deletePack = async (req, res, next) => {
    const { id } = req.params;

    try {

        const packEliminado = await PackActividad.findByIdAndDelete(id);

        if (!packEliminado) {
            responseAPI.msg = 'pack de actividades no encontrado';
            responseAPI.status = 'error';
            return res.status(404).json(responseAPI);
        }

        responseAPI.msg = 'pack de actividades eliminado correctamente';
        responseAPI.data = packEliminado;
        res.status(200).json(responseAPI);

    } catch (err) {
        console.error('error al crear pack de actividades', err);
        next(err);
    }
}