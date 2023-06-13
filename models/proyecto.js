const{Schema, model, default: mongoose}= require ("mongoose")


const proyectoSchema= Schema({
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
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    tareas:[
        {        
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tarea"
        }
    ],
    cliente:{
        type: String,
        required:[true, "El cliente es obligatorio"]
    }
})

proyectoSchema.methods.toJSON= function(){
    const{__v,_id, ...proyectos}=this.toObject()
    proyectos.uid= _id
    return proyectos
  }


module.exports= model("Proyecto", proyectoSchema)