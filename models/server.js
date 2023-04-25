const{dbConection}= require("../config/db.js")
const express = require('express')
const cors = require('cors')

class Server{

    constructor(){

        this.app= express()

        this.port= process.env.PORT

        this.usuarios="/api/usuarios"
        this.proyectos="/api/proyectos"
        this.tareas="/api/tareas"
        


        this.conectarDB()

        this.middlewares()
        this.routes()


    }

    middlewares(){

        this.app.use(cors(corsOptions))
        this.app.use(express.json())

    }

    async conectarDB(){
        await dbConection()
    }

    routes(){
        this.app.use(this.usuarios, require("../routes/user"))
        this.app.use(this.proyectos, require("../routes/proyecto"))
        this.app.use(this.tareas, require("../routes/tarea"))
    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor corriendo en el puerto", this.port)
        })
    }
}

const whiteList= ["http://localhost:5173"]

const corsOptions= {
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            callback(null,true)
        }else{
            callback(new Error("Error de cors"))
        }
    }
}



module.exports= Server