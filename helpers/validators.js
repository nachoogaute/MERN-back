const Proyecto = require("../models/proyecto")
const Tarea = require("../models/tarea")
const Usuario = require("../models/usuario")


const existeEmail= async (email= "")=>{

    const existeEmail= await Usuario.findOne({email})
    if(existeEmail){
        throw new Error("El email ya existe")
    }
}

const existeUsuarioPorID= async(id)=>{

    const existeID= await Usuario.findById(id)
    if(!existeID){
        throw new Error("El id no existe")
    }

}

const existeProyectoPorID= async(id)=>{

    const existeID= await Proyecto.findById(id)
    if(!existeID){
        throw new Error("El id no existe")
    }

}

const existeTareaPorID= async(id)=>{

    const existeID= await Tarea.findById(id)
    if(!existeID){
        throw new Error("El id no existe")
    }

}

const NoExisteEmail= async (email= "")=>{

    const existeEmail= await Usuario.findOne({email})
    if(!existeEmail){
        throw new Error("El email no existe")
    }
}

module.exports={
    existeEmail,
    existeUsuarioPorID,
    existeProyectoPorID,
    existeTareaPorID,
    NoExisteEmail
}