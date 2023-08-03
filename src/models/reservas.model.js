const getAllReservas = () => {
  return db.query("select * from reservas");
};

const reservaById = (id_reserva) => {
  return db.query("select * from reservas where id_reserva = ?", [
    id_reserva,
  ]);
};

const reservasBySesion = (sesion_id) => {
  return db.query("select * from reservas where sesion_id = ?", [
    sesion_id,
  ]);
}

const deleteById = (id_reserva) => {
  return db.query("delete from reservas where id_reserva = ?", [
    id_reserva,
  ]);
};

const updateById = (
  id_reserva,
  {
    usuarios_id,
    sesion_id,
    fecha_reserva,
    hora_reserva,
    titulo,
    descripcion,
    validada
  }
) => {
  return db.query(
    "update reservas set usuarios_id = ?, sesion_id= ?, fecha_reserva= ?, hora_reserva= ?, fecha_fin_reserva= ?, hora_fin_reserva = ?, titulo = ?, descripcion = ?, validada = ? where id_reserva = ?",
    [
      usuarios_id,
      sesion_id,
      fecha_reserva,
      hora_reserva,
      titulo,
      descripcion,
      validada,
      id_reserva
    ]
  );
};


const aceptarById = (id_reserva, validada) => {
  return db.query(
    "update reservas set validada = ? where id_reserva = ?", [validada, id_reserva])
}




const insert = ({
  usuarios_id,
  sesion_id,
  fecha_reserva,
  hora_reserva,
  titulo,
  descripcion
}) => {
  return db.query(
    "insert into reservas (usuarios_id, sesion_id, fecha_reserva, hora_reserva, fecha_fin_reserva, hora_fin_reserva, titulo, descripcion) values (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      usuarios_id,
      sesion_id,
      `${fecha_reserva}T${hora_reserva}`,
      hora_reserva,
      titulo,
      descripcion
    ]
  );
};

module.exports = {
  getAllReservas,
  reservaById,
  deleteById,
  updateById,
  aceptarById,
  insert,
  reservasBySesion
};
