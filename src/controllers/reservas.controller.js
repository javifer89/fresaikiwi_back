const Reserva = require("../models/reservas.model");

const getAll = async (req, res) => {
  try {
    const [reservas] = await Reserva.getAllReservas();
    res.json(reservas);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const [reservas] = await Reserva.reservaByid(req.params.id_reserva); //revisar req.params
    console.log(reservas);
    if (reservas.length === 0) {
      return res.json({ fatal: "no existe esa reserva" });
    }
    res.json(reservas[0]);
    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id_reserva } = req.params;

    const [result] = await Reserva.deleteById(id_reserva);

    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id_reserva } = req.params;
    req.body.usuarios_id = req.user.id
    const [result] = await Reserva.updateById(+id_reserva, req.body);

    const [reservas] = await Reserva.reservaById(+id_reserva);

    // res.json({ reservas, result });
    res.json(reservas);
    // res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const aceptar = async (req, res) => {
  try {
    const { id_reserva } = req.params;
    const [result] = await Reserva.aceptarById(id_reserva, req.body.aceptada);
    const [reserva] = await Reserva.reservaById(id_reserva);
    res.json(reserva)
  } catch (error) {
    res.json({ fatal: error.message });
  }
}


const create = async (req, res) => {
  try {
    req.body.usuarios_id = req.user.id;
    const [result] = await Reserva.insert(req.body);
    console.log(result);
    const [reservas] = await Reserva.reservaById(result.insertId);

    // res.json(result);
    res.json(reservas[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};



module.exports = {
  getAll,
  getById,
  remove,
  update,
  aceptar,
  create,
};
