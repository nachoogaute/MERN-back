const Proyecto= require("../models/proyecto")


const obtenerProyecto= async(req, res)=>{

    const{id}= req.params

    const proyecto= await Proyecto.findById(id).populate("creador", "nombre")

    res.json({
        proyecto
    })


}

const obtenerProyectos= async(req, res)=>{

    const {limite=5, desde=0}= req.query

    const[total,proyectos]=await Promise.all([
        Proyecto.count(),
        Proyecto.find()
            .populate("creador", "nombre")
            .skip(Number(desde))
            .limit(Number(limite))
      ])

    res.json({
        total,
        proyectos
    })
}


const crearProyecto= async (req, res)=>{
    const {nombre, descripcion}= req.body

    const proyectoDB= await Proyecto.findOne({nombre})
    if(proyectoDB){
        return res.status(400).json({
            msg: `El proyecto ${proyectoDB.nombre} ya existe`
        })
    }

    const data={
        nombre,
        descripcion,
        creador: req.usuario._id

    }

    const proyecto= new Proyecto(data)

    await proyecto.save()

    res.status(201).json(proyecto)
}


const actualizarProyecto= async(req,res)=>{
    const {id}= req.params

    const{usuario,... resto}= req.body

    const proyecto= await Proyecto.findByIdAndUpdate(id, resto, {new:true})

    res.json({
        proyecto
    })
}


const eliminarProyecto= async(req, res)=>{

    const {id} = req.params

    const proyecto= await Proyecto.findByIdAndDelete(id)

    res.json({
        proyecto
    })
}

module.exports={
    obtenerProyecto,
    obtenerProyectos,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto
}
