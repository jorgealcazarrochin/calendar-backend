const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  // * Recibimos en los headers como x-token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la validación ",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.PRIVATE_KEY_JWT);

    req.uid = uid;
    req.name = name;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
