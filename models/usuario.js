const{Schema, model}= require ("mongoose")

const usuarioSchema= Schema({
    nombre:{
        type: String,
        required:[true, "El nombre es obligatorio"]
    },
    email:{
        type: String,
        required:[true, "El email es obligatorio"],
        unique: true
    },
    contraseña:{
        type: String,
        required:[true, "La contraseña es obligatoria"]
    },
    token:{
        type:String
    },
    estado:{
        type: Boolean,
        default: true
    },
    confirmado:{
        type: Boolean,
        default: false,
        required: true
    }
    

},{
    timestamps: true
})

usuarioSchema.methods.toJSON= function(){
    const{__v, contraseña,_id, ...usuarios}=this.toObject()
    usuarios.uid= _id
    return usuarios
  }

module.exports= model("Usuario", usuarioSchema)