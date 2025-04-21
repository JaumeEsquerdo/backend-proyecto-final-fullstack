import mongoose from "mongoose"

const options = {
    collection: 'actividades_calendario', //nombre de la colección en MongoDB
    strict: true, // solo permite guardar los campos definidos en el esquema
    collation: {
        locale: "es", // config para el idioma que sea español
        strength: 1 //nivel de comparación de strings( 1: ignorar mayúsculas, minúsculas y tildes)
    }
}

const actividadSchema = new mongoose.Schema({
    title: {type: String, required: true},
    time: {type: Date, required: true}, // fecha y horas exactas
    timeExact: {type: String, required: true}, // hora exacta ("10:30")
    displayHours:{type:String,required: true}, // hora redondeada("10:00")
    description: {type: String},
    // y el id lo genera mongoose directamente

    //asociar con el Usuario que crea la actividad
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required: true

    }
}, options)

export const Actividad = mongoose.model("Actividad", actividadSchema)  //se suele exportar al archivo donde está