const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return resp.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    //  * Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // * Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    resp.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUsuario = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return resp.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    // * Confirmar password
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return resp.status(400).json({
        ok: false,
        msg: "Contraseña no válida",
      });
    }

    // * Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    resp.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const revalidarToken = async (req, resp) => {
  const { uid, name } = req;

  // * Generar un JWT
  const token = await generarJWT(uid, name);

  resp.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
