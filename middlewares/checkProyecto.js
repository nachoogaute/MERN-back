const jwt= require("jsonwebtoken")
const Proyecto = require("../models/proyecto")

const checkProyecto = async(req, res, next)=>{

    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    try{
        token= req.headers.authorization.split(" ")[1]

        const decoded= jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        

        req.proyecto= await Proyecto.findById(decoded.uid)
        return next()
    }catch(error){
        return res.status(404).json({msg: "Hubo un Error"})
        
    }


    next()

}


module.exports= checkProyecto