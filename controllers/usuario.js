
const generarJWT = require("../helpers/generar.jwt")
const { existeEmail } = require("../helpers/validators")
const Usuario= require("../models/usuario")
const bcryptjs= require("bcryptjs")
const {generarID}= require("../helpers/generarID")
const {emailRegistro, emailOlvidePassword}= require ("../helpers/emails.js")


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

    emailRegistro({
       email: usuario.email,
       nombre: usuario.nombre,
       token:usuario.token
    })

    res.json({
        msg: "Usuario Creado Correctamente",
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

        if(!usuario.confirmado){
            return res.status(400).json({
                msg: "Tu cuenta no ha sido"
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

const confirmar= async (req, res)=>{

    const{token}= req.params
    const usuarioConfirmar= await Usuario.findOne({token})

    if(!usuarioConfirmar){
        const error= new Error("Token no valido")
        return res.status(403).json({msg: error.message})
    }

    try{
        usuarioConfirmar.confirmado= true
        usuarioConfirmar.token= ""
        await usuarioConfirmar.save()
        res.json({msg:"Usuario confirmado"})
    }catch(error){
        console.log(error)
    }
}

const olvidePassword= async (req, res)=>{

    const{email}= req.body
    const usuario= await Usuario.findOne({email})

    if(!usuario){
        const error= new Error("El email no existe")
        return res.status(403).json({msg: error.message})
    }
    try{
        usuario.token= generarID()
        await usuario.save()

        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token:usuario.token
        })
    }catch(error){
        console.log(error)
    }

    res.json({
        usuario,
        msg: "Hemos enviado un mail con las instrucciones"
    })


}

const comprobarToken= async (req, res)=>{

    const{token}= req.params
    const usuarioConfirmar= await Usuario.findOne({token})

    if(!usuarioConfirmar){
        const error= new Error("Token no valido")
        return res.status(403).json({msg: error.message})
    }

    res.json({
        msg: "Token valido.El usuario existe"
    })
}

const nuevoPassword= async (req,res) =>{
    const{token}= req.params
    const{contraseña}= req.body
    const usuario= await Usuario.findOne({token})

    if(usuario){
        usuario.contraseña= contraseña
        usuario.token= ""
        const salt= bcryptjs.genSaltSync()
        usuario.contraseña= bcryptjs.hashSync(contraseña, salt)
        try{
            await usuario.save()
            res.json({msg: "Password Actualizado"})
        }catch(error){
            console.log(error)
        }
    }else{
        const error= new Error("Token no valido")
        return res.status(404).json({msg: error.message})   
    }


}

const perfil = async (req, res)=>{
    const {usuario}= req
    res.json(usuario)
}




module.exports={
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    loginUsuario,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}