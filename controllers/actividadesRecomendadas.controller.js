import { ActividadRecomendacion } from "../db/models/actividadesRecomendadas.model.js";

const responseAPI = {
    msg: "",
    data: [],
    status: "ok", //error
    cant: null,
}

//crear nueva recomendacion(solo 1 actividad)
export const createRecomendacion = async (req , res, next) =>{
    const {titulo, descripcion, tipo} = req.body;

    try{
        const nueva = await ActividadRecomendacion.create({titulo, descripcion, tipo});

        responseAPI.msg = "Recomendacion creada correctamente"
        responseAPI.data = nueva
        res.status(201).json(responseAPI)


    }catch(err){
        console.error('error al crear recomendacion', err)
        next(err);
    }
}

//obtener todas las recomendaciones
export const getRecomendaciones = async (req , res ,next)=>{
    try{
        const recomendaciones = await ActividadRecomendacion.find();

        responseAPI.msg='actividades recomendadas obtenidas';
        responseAPI.data = recomendaciones;
        res.status(200).json(responseAPI)
    }catch(err){
        console.error('error al crear recomendacion', err)
        next(err);
    }
}

// obtener una recomendacion por id
export const getRecomendacionById = async (req , res ,next)=>{
    const {id}  =req.params;

    try{

        const recomendacion = await ActividadRecomendacion.findById(id);

        if(!recomendacion){
            responseAPI.msg = 'recomendacion no encontrada'
            responseAPI.status='error'
            return res.status(404).json(responseAPI)
        }

        responseAPI.msg = 'recomendacion encontrada';
        responseAPI.data = recomendacion;
        res.status(200).json(responseAPI);

    }catch(err){
        console.error('error al crear recomendacion', err)
        next(err);
    }
}

// actualizar recomendacion (creo q este no lo voy a utilizar)
export const updateRecomendacion = async (req, res, next) =>{
    const {id}=req.params;
    const {titulo, descripcion, tipo}= req.body;

    try{

        const actualizada = await ActividadRecomendacion.findByIdAndUpdate(
            id,
            {titulo, descripcion, tipo},
            {new:true}
        );

        if(!actualizada){
            responseAPI.msg = 'recomendacion no encontrada';
            responseAPI.status='error';
            return res.status(404).json(responseAPI)
        }

        responseAPI.msg = 'recomendacion actualizada';
        responseAPI.data=actualizada;
        res.status(200).json(responseAPI)

    }catch(err){
        console.error('error al crear recomendacion', err)
        next(err);
    }
}

//eliminar recomendacion
export const deleteRecomendacion = async(req, res, next) =>{
    const {id} = req.params;
    try{
        const eliminada = await ActividadRecomendacion.findByIdAndDelete(id);

        if(!eliminada){
            responseAPI.msg = 'recomendacion no encontrada';
            responseAPI.status='error';
            return res.status(404).json(responseAPI)
        }

        responseAPI.msg = 'recomendacion eliminada correctamente';
        responseAPI.data = eliminada;
        res.status(200).json(responseAPI)
    }catch(err){
        console.error('error al crear recomendacion', err)
        next(err);
    }
}