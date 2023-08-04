const Sesion = require("../models/sesiones.model");
const Reserva = require("../models/reservas.model");
const dayjs = require("dayjs");


const getAll = async (req, res) => {
  try {
    const [sesiones] = await Sesion.getAllSesiones();
    res.json(sesiones);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getById = async (req, res) => {
  // TODO COMPROBAR SI FUNCIONA BIEN CON EL TRY CATCH O SE VUELVE A COMENTAR.
  try {
    const [sesion] = await Sesion.sesionByid(req.params.sesionId);

    if (sesion.length === 0) {
      return res.json({ fatal: "no existe esa sesión" });
    }

    const [reservas] = await Reserva.reservasBySesion(sala[0].id);
  sala[0].reservas = reservas.map((reserva) => {
      //transformo a string las fechas y horas de reserva

      return {
        title: reserva.titulo,
        description: reserva.descripcion,
        start: reserva.fecha_reserva,
        end: reserva.fecha_fin_reserva, // TODO SOLUCIONAR HORA DE FIN DE SESION
      };
    });

    res.json(sala[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

// const getByUsuario = async (req, res) => {
//   try {
//     const [sesiones] = await Sesion.usuarioSesion(req.params.id);
//     res.json(sesiones[0]);
//   } catch (error) {
//     res.json({ fatal: error.message });
//   }
// };

const remove = async (req, res) => {
  try {
    const { sesionId } = req.params;

    const [result] = await Sesion.deleteById(sesionId);

    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { sesionId } = req.params;
    const [result] = await Sesion.updateById(sesionId, req.body);
    const [sesiones] = await Sesion.getById(sesionId);

    res.json(sesiones[0]);
  } catch (error) {
    res.json({ fatal: error.message })
  }
}

const create = async (req, res) => {
  try {
    const [result] = await Sesion.insert(req.body);
    console.log(result)
    const [sesiones] = await Sesion.getById(result.insertId);

    res.json(sesiones[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};


const comprobarSesion = async (req, res) => {
  try {
    const { sesion_id, fecha_reserva, hora_reserva } = req.body;
    const sesionDisponible = await Sesion.checkSalas(
      sesion_id,
      fecha_reserva,
      hora_reserva
    );
    if (sesionDisponible[0].length === 0) {
      res.json({ disponible: true });
    } else {
      res.json({ disponible: false });
    }
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

module.exports = {
  getAll,
  // getByUsuario,
  getById,
  remove,
  update,
  create,
  comprobarSesion,
};
