const{Router}= require("express")

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar.jwt");
const { obtenerTarea, obtenerTareas, crearTarea, actualizatTarea, estadoTarea } = require("../controllers/tarea");
const { existeTareaPorID } = require("../helpers/validators");






const router= Router()

router.get("/:id",[
    validarCampos
], obtenerTarea)

router.get("/",[
    validarCampos
], obtenerTareas)

router.post("/",[
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria"),
    validarCampos
], crearTarea)

router.put("/:id",[
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeTareaPorID),
    validarCampos
], actualizatTarea )

router.delete("/:id",[
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeTareaPorID),
    validarCampos
],estadoTarea )


module.exports= router