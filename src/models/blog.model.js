const getAllPost = () => {
    return db.query("select * from blog");
  };

  const postById = (id_post) => {
    return db.query("select * from blog where id_post = ?", [
        id_post,
    ]);
  };

  const postByCategory = (categoria) => {
    return db.query("select * from blog where categoria = ?", [
      categoria,
    ]);
  }

  const deleteById = (id_post) => {
    return db.query("delete from blog where id_post = ?", [
      id_post,
    ]);
  };

  const updateById = (
    id_post,
    {
      usuario_id,
      post_id,
      fecha_post,
      hora_post,
      titulo,
      texto,
    }
  ) => {
    return db.query(
      "update reservas set usuario_id = ?, post_id= ?, fecha_post= ?, hora_post= ?, titulo = ?, texto = ?, where id_post = ?",
      [
        usuario_id,
        post_id,
        fecha_post,
        hora_post,
        titulo,
        texto,
        id_post
      ]
    );
  };

  const createPost = ({
    usuario_id,
    categoria,
    fecha_post,
    hora_post,
    titulo,
    texto
  }) => {
    return db.query(
      "insert into blog (usuarios_id, sesion_id, fecha_post, hora_post, titulo, texto) values (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        usuario_id,
        categoria,
        // TODO REVISAR COMO PONER LA FECHA Y LA HORA (CONCATENAR?)
        `${fecha_post}T${hora_post}`,
        hora_post,
        titulo,
        texto
      ]
    );
  };
// TODO VALIDAR POST?
//   const aceptarById = (id_reserva, validada) => {
//     return db.query(
//       "update reservas set validada = ? where id_reserva = ?", [validada, id_reserva])
//   }

  module.exports = {
    getAllPost,
    postById,
    postByCategory,
    deleteById,
    updateById,
    createPost
    // aceptarById
  };
