const getUsuarios = () => {
  return db.query("select * from usuarios");
};

const getByEmail = (email) => {
  return db.query("select * from usuarios where email = ?", [email]);
};
const usuarioById = (id) => {
  return db.query("select * from usuarios where id = ?", [id]);
};

const deleteById = (usuarioId) => {
  return db.query("delete from usuarios where id = ?", [usuarioId]);
};

const getById = (usuarioId) => {
  return db.query("select * from usuarios where id = ?", [usuarioId]); //donde va el valor que es variable ponemos un ?
};

const updateById = (
  usuarioId,
  { username, email, telefono, dni, nombre, direccion }
) => {
  return db.query(
    "update usuarios set username = ?, email = ?, telefono = ?, dni = ?, nombre = ?, direccion = ? where id = ?",
    [username, email, telefono, dni, nombre, direccion, usuarioId]
  );
};

const insert = ({
  nombre,
  direccion,
  email,
  telefono,
  dni,
  username,
  password,
}) => {
  return db.query(
    "insert into usuarios (nombre, direccion, email, telefono, dni, username, password) values (?, ?, ?, ?, ?, ?, ?)",
    [nombre, direccion, email, telefono, dni, username, password]
  );
};

module.exports = {
  getUsuarios,
  getByEmail,
  usuarioById,
  deleteById,
  updateById,
  getById,
  insert,
};
