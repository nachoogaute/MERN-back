const{Router}= require("express")

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { existeProyectoPorID } = require("../helpers/validators");
const { obtenerProyectos, crearProyecto, actualizarProyecto, eliminarProyecto, obtenerProyecto } = require("../controllers/proyecto");
const { validarJWT } = require("../middlewares/validar.jwt");






const router= Router()

router.get("/:id",[
    validarCampos
], obtenerProyecto)

router.get("/",[
    validarCampos
], obtenerProyectos)

router.post("/",[
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria"),
    validarCampos
], crearProyecto)

router.put("/:id",[
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProyectoPorID),
    validarCampos
], actualizarProyecto )

router.delete("/:id",[
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProyectoPorID),
    validarCampos
],eliminarProyecto )


module.exports= router