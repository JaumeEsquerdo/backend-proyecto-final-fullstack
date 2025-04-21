import mongoose from "mongoose"

const options = {
    collection: 'actividades_recomendadas', //nombre de la colección en MongoDB
    strict: true, // solo permite guardar los campos definidos en el esquema
    collation: {
        locale: "es", // config para el idioma que sea español
        strength: 1 //nivel de comparación de strings( 1: ignorar mayúsculas, minúsculas y tildes)
    }
}

const actividadRecomendacionSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true}, 
    tipo: {type: String, enum: ['cultural','playa','aventura','deporte','gastronomia'] ,required: true}, 
    
}, options)

export const ActividadRecomendacion = mongoose.model("ActividadRecomendacion", actividadRecomendacionSchema)  //se suele exportar al archivo donde está