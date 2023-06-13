const{Schema, model, default: mongoose}= require ("mongoose")


const tareasSchema= Schema({
    nombre:{
        type: String,
        required:[true, "El nombre es obligatorio"]
    },
    descripcion:{
        type: String,
        required:[true, "La descripcion es obligatoria"]
    },
    fechaEntrega:{
        type: Date,
        default: Date.now()
    },
    estado:{
        type: Boolean,
        default: false
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto"
    }
})



module.exports= model("Tarea", tareasSchema)