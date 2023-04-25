const{Router}= require("express")
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete, loginUsuario } = require("../controllers/usuario");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { existeEmail, existeUsuarioPorID } = require("../helpers/validators");


const router= Router()


router.get("/",[
    validarCampos
], usuarioGet)

router.post("/",[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("contraseña", "La contraseña debe de ser mas de 6 letras").isLength({min:6}),
    check("email").custom(existeEmail),
    validarCampos
], usuarioPost)

router.put("/:id",[
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    validarCampos
], usuarioPut )

router.delete("/:id",[
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    validarCampos
],usuarioDelete )

router.post("/Login",[
    check("contraseña", "La contraseña es obligatoria ").not().isEmpty(),
    validarCampos
], loginUsuario)


module.exports= router