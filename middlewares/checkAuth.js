const jwt= require("jsonwebtoken")
const Usuario = require("../models/usuario")

const checkAuth = async(req, res, next)=>{

    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    try{
        token= req.headers.authorization.split(" ")[1]

        const decoded= jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        req.usuario= await Usuario.findById(decoded.uid).select("-contraseña -confirmado -token -createdAt -estado -updatedAt")
        return next()
    }catch(error){
        return res.status(404).json({msg: "Hubo un Error"})
        
    }

    if(!token){
        const error = new Error ("Token no valido")
        res.status(401).json({
            msg: error.message
        })
    }

    next()

}


module.exports= checkAuth