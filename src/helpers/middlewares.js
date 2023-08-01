const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createToken } = require("../helpers/utils");

const Usuario = require("../models/usuarios.model");
const Staff = require("../models/staff.model");

const checkUsuarioId = async (req, res, next) => {
  const { usuarioId } = req.params;
  const [usuarios] = await Usuario.usuarioById(usuarioId);

  if (usuarios.length === 0) {
    return res.send({ fatal: "El usuario no existe" });
  }
  next();
};

const checkToken = async (req, res, next) => {
  //1. comprobamos si el token viene incluido en la petición (headers -Authorization)
  // console.log('Pasa por el checkToken');
  if (!req.headers["authorization"]) {
    return res.json({ fatal: "Necesitas la cabecera de autorización" });
  }
  const token = req.headers["authorization"];
  //2. Comprobamos si el token es correcto
  //3. Comprobamos si el token está caducado (opcional)
  let obj;
  try {
    obj = jwt.verify(token, "esta es la verificación del token");
  } catch (error) {
    res.json({ fatal: "El token es incorrecto" });
  }
  console.log(obj);
  //4. Recuperamos el USUARIO asociado al token
  //Función que recupere de la BD el usuario de su ID (getById)
  const [staff] = await Staff.getById(obj.userId);
  console.log(staff[0])
  req.user = staff[0];
  //si logramos pasar las comprobaciones del Middleware checkToken, a partir de ahí tendremos acceso SIEMPRE a req.user
  //req.user es el valor del usuario LOGADO en la aplicación
  next();
};

const checkTokenUsuario = async (req, res, next) => {
  //1. comprobamos si el token viene incluido en la petición (headers -Authorization)
  // console.log('Pasa por el checkToken');
  if (!req.headers["authorization"]) {
    return res.json({ fatal: "Necesitas la cabecera de autorización" });
  }
  const token = req.headers["authorization"];
  //2. Comprobamos si el token es correcto
  //3. Comprobamos si el token está caducado (opcional)
  let obj;
  try {
    obj = jwt.verify(token, "esta es la verificación del token");
  } catch (error) {
    res.json({ fatal: "El token es incorrecto" });
  }
  console.log(obj);
  //4. Recuperamos el USUARIO asociado al token
  //Función que recupere de la BD el usuario de su ID (getById)
  const [usuario] = await Usuario.getById(obj.userId);
  console.log(usuario[0]);
  req.user = usuario[0];
  //si logramos pasar las comprobaciones del Middleware checkToken, a partir de ahí tendremos acceso SIEMPRE a req.user
  //req.user es el valor del usuario LOGADO en la aplicación
  next();
};

const checkRol = (user) => {
  if (user.rol === "Administrador" || user.rol === "Trabajador") {
    return true;
  }
  return false;
};

const checkLogin = async (req, res, next) => {
  //existe el email en la base de datos?

  const [staff] = await Staff.getByEmail(req.body.email);
  if (staff.length === 0) {
    return res.json({ fatal: 'No hay usuario con ese email' });
  }

  const user = staff[0];
  //Comprobar si las password coinciden
  const iguales = bcrypt.compareSync(req.body.password, user.password);
  if (!iguales) {
    return res.json({ fatal: "error en el email y/o contraseña" });
  }

  res.json({
    succes: "Login correcto",
    token: createToken(user),
    rol: user.rol,
    // id: user.id
  });

  next();
};

module.exports = {
  checkUsuarioId,
  checkToken,
  checkTokenUsuario,
  checkLogin,
  checkRol,
};
