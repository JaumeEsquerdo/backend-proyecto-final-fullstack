import mongoose from "mongoose"

const options = {
    collection: 'packs_actividades', //nombre de la colección en MongoDB
    strict: true, // solo permite guardar los campos definidos en el esquema
    collation: {
        locale: "es", // config para el idioma que sea español
        strength: 1 //nivel de comparación de strings( 1: ignorar mayúsculas, minúsculas y tildes)
    }
}

const packActividadSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    icono: {type: String, required: true}, // url del icono
    color: {type: String, enum: ['yellow','red','pink','green','brown','purple','blue','orange'] ,required: true},
    actividades:[{type: mongoose.Schema.Types.ObjectId, ref: 'ActividadRecomendacion'}]
    
}, options)

export const PackActividad = mongoose.model("PackActividad", packActividadSchema)  //se suele exportar al archivo donde está