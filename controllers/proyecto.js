const Proyecto= require("../models/proyecto")


const obtenerProyecto= async(req, res)=>{

    const{id}= req.params

    const proyecto= await Proyecto.findById(id).populate("tareas")

    res.json(proyecto)


}

const obtenerProyectos= async(req, res)=>{

    const proyectos= await Proyecto.find().where("creador").equals(req.usuario).select("-tareas")

    res.json(proyectos)
}


const crearProyecto= async (req, res)=>{
    const {nombre, descripcion, cliente}= req.body


    const data={
        nombre,
        descripcion,
        cliente,
        creador: req.usuario
    }

    const proyecto= new Proyecto(data)

    await proyecto.save()

    res.status(201).json(proyecto)
}


const actualizarProyecto= async(req,res)=>{
    const {id}= req.params

    const{usuario,... resto}= req.body

    const proyecto= await Proyecto.findByIdAndUpdate(id, resto, {new:true})

    res.json(
        proyecto
    )
}


const eliminarProyecto= async(req, res)=>{

    const {id} = req.params

    const proyecto= await Proyecto.findByIdAndDelete(id)

    res.json(
        proyecto
    )
}

module.exports={
    obtenerProyecto,
    obtenerProyectos,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto
}
