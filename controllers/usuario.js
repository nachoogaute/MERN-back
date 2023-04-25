
const generarJWT = require("../helpers/generar.jwt")
const { existeEmail } = require("../helpers/validators")
const Usuario= require("../models/usuario")
const bcryptjs= require("bcryptjs")
const {generarID}= require("../helpers/generarID")


const usuarioGet= async(req, res)=>{

    const {limite=5, desde=0}= req.query

    const[total,usuarios]=await Promise.all([
        Usuario.count({estado:true}),
        Usuario.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
      ])

    res.json({
        total,
        usuarios
    })
}


const usuarioPost= async (req, res)=>{
    const {nombre, email, contraseña, token}= req.body

    const usuario= new Usuario({nombre, email, contraseña, token})
    usuario.token= generarID()

    await existeEmail()

    const salt= bcryptjs.genSaltSync()
    usuario.contraseña= bcryptjs.hashSync(contraseña, salt)



    await usuario.save()

    res.json({
        usuario
    })
}


const usuarioPut= async(req,res)=>{
    const {id}= req.params

    const{_id, contraseña,... resto}= req.body

    if(contraseña){

        const salt= bcryptjs.genSaltSync()
        resto.contraseña= bcryptjs.hashSync(contraseña, salt)
        }

    const usuario= await Usuario.findByIdAndUpdate(id,resto, {new:true})

    res.json({
        usuario
    })
}


const usuarioDelete= async(req, res)=>{

    const {id} = req.params

    const usuario= await Usuario.findByIdAndUpdate(id, {estado:false})

    res.json({
        usuario
    })
}


const loginUsuario= async(req, res)=>{

    const {email, contraseña}= req.body

    try{
        const usuario= await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({
                msg: "El usuario/contraseña no son validos - email"
            })
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: "La cuenta ha sido eliminada"
            })
        }

        const validarContraseña= bcryptjs.compareSync(contraseña, usuario.contraseña)
        if(!validarContraseña){
            return res.status(400).json({
                msg:"Usuario / contraseña no son validos - contraseña"
            })
        }

        const token= await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })
        
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}

module.exports={
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    loginUsuario
}