const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, resp = response, next) => {
  // * Manejo de errores
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return resp.status(400).json({
      ok: false,
      msg: firstError.msg,
    });
  }

  next();
};

module.exports = {
  validarCampos,
};
