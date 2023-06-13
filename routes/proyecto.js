const{Router}= require("express")

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { existeProyectoPorID } = require("../helpers/validators");
const { obtenerProyectos, crearProyecto, actualizarProyecto, eliminarProyecto, obtenerProyecto } = require("../controllers/proyecto");
const { validarJWT } = require("../middlewares/validar.jwt");
const checkProyecto = require("../middlewares/checkProyecto");
const checkAuth = require("../middlewares/checkAuth");






const router= Router()

router.get("/:id",[
    checkAuth,
    validarCampos
], obtenerProyecto)

router.get("/",[
    checkAuth,
    validarCampos
], obtenerProyectos)

router.post("/",[
    checkAuth,
    checkProyecto,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria"),
    validarCampos
], crearProyecto)

router.put("/:id",[
    checkAuth,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProyectoPorID),
    validarCampos
], actualizarProyecto )

router.delete("/:id",[
    checkAuth,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProyectoPorID),
    validarCampos
],eliminarProyecto )


module.exports= router