const{Router}= require("express")

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar.jwt");
const { obtenerTarea, obtenerTareas, crearTarea, actualizatTarea, estadoTarea, eliminarTarea } = require("../controllers/tarea");
const { existeTareaPorID } = require("../helpers/validators");
const checkAuth = require("../middlewares/checkAuth");





const router= Router()

router.get("/:id",[
    checkAuth,
    validarCampos
], obtenerTarea)

router.get("/",[
    checkAuth,
    validarCampos
], obtenerTareas)

router.post("/",[
    checkAuth,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria"),
    validarCampos
], crearTarea)

router.put("/:id",[
    checkAuth,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeTareaPorID),
    validarCampos
], actualizatTarea )

router.delete("/:id",[
    checkAuth,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeTareaPorID),
    validarCampos
],eliminarTarea )

router.post("/estado/:id",[
    checkAuth,
    validarCampos
], estadoTarea)


module.exports= router