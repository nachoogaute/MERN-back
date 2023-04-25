const Proyecto = require("../models/proyecto")
const Tarea = require("../models/tarea")


const obtenerTarea= async(req, res)=>{

    const {id}= req.params

    const tarea= await Tarea.findById(id).populate("proyecto", "nombre")

    res.json({
        tarea
    })
}

const obtenerTareas= async(req, res)=>{
    const tarea= await Tarea.findOne().populate("proyecto", "nombre")

    res.json({
        tarea
    })
}

const crearTarea= async(req,res)=>{

    
    const {proyecto}= req.body

    const existeProyecto= await Proyecto.findById(proyecto)
    if(!existeProyecto){
        return res.status(400).json({
            msg: `El proyecto ${existeProyecto.nombre} no existe`
        })
    }
    if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
        return res.status(400).json({
            msg: `El usuario no tiene permiso`
        })
    }

    const tarea=  new Tarea(req.body)
    await tarea.save()

    res.status(201).json(tarea)
}

const actualizatTarea= async(req, res)=>{
    const {id}= req.params
    const {proyecto, ...resto}= req.body

    const tarea= await Tarea.findByIdAndUpdate(id, resto)

    res.json({
        tarea
    })
}

const estadoTarea= async(req,res)=>{
    const {id}= req.params

    const tarea= await Tarea.findByIdAndUpdate(id, {estado: false})

    res.json({
        tarea
    })
}

module.exports={
    obtenerTarea,
    obtenerTareas,
    crearTarea,
    actualizatTarea,
    estadoTarea
}