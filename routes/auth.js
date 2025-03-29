/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

// router.post(path, [ middlewares ], function);

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("email", "No tiene formato de email").isEmail(),
    check(
      "password",
      "La contraseña debe ser mínimo de 6 caracteres "
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "No tiene formato de email").isEmail(),
    check("password", "La contraseña debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
