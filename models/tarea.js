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

tareasSchema.methods.toJSON= function(){
    const{__v,_id, ...tarea}=this.toObject()
    tarea.uid= _id
    return tarea
  }

module.exports= model("Tarea", tareasSchema)