const Contacto = require("../models/contacto.model");

const getFormulario = async (req, res) => {
  try {
    const [contacto] = await Contacto.getForm(req.params.formId);
    if (contacto.length === 0) {
      return res.json({ fatal: "no existe ese formulario de contacto" });
    }
    res.json(contacto[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const create = async (req, res) => {
  try {
    const [result] = await Contacto.insert(req.body);
    // const [contacto] = await Contacto.getForm(result.insertId);
    // res.json(contacto[0]);
    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

module.exports = {
  getFormulario,
  create,
};
