const getAllSesiones = () => {
  return db.query("select * from sesiones");
};

const sesionByid = (sesionId) => {
  return db.query("select * from sesiones where id = ?", [sesionId]);
};

const getById = (sesionId) => {
  return db.query("select * from sesiones where id = ?", [sesionId]);
};
// const usuarioSesion = (id) => {
//   return db.query("select * from reservas where usuarios_id = ?", [
//     id,
//   ]);
// };

const updateById = (sesionId, { precio, nombre, duracion }) => {
  return db.query(
    "update sesiones set precio = ?, nombre = ?, direccion = ?, descripcion = ?, url_foto = ?, telefono_contacto = ?, email_contacto= ? where id = ?",
    [precio, nombre, duracion, sesionId]
  );
};

const insert = ({ precio, nombre, duracion }) => {
  return db.query(
    "insert into sesiones (precio, nombre, duracion) values (?, ?, ?)",
    [precio, nombre, duracion]
  );
};

const deleteById = (sesionId) => {
  return db.query("delete from sesiones where id = ?", [sesionId]);
};

const checkSesiones = (sesion_id, fecha_reserva, hora_reserva) => {
  return db.query(
    "select * from reservas where sesions_id = ? and fecha_reserva= ? and hora_reserva= ?",
    [sesion_id, fecha_reserva, hora_reserva]
  );
};

module.exports = {
  getAllSesiones,
  sesionByid,
  deleteById,
  updateById,
  getById,
  insert,
  checkSesiones,
};
