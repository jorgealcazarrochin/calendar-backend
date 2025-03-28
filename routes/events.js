const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

const router = Router();

// * Todas tienen que pasar por la validación de JWT, al hacer lo siguiente lo hace
router.use(validarJWT);

// * Obtener eventos
router.get("/", getEventos);

// * Obtener crear evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha final es obligatorio").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// * Actualizar evento
router.put("/:id", actualizarEvento);

// * Eliminar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
