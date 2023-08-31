const router = require("express").Router();

// const { checkToken } = require("../helpers/middlewares");

router.use("/usuarios", require("./api/usuarios"));

router.use("/sesiones", /*checkToken,*/ require("./api/sesiones"));

router.use("/contacto", require("./api/contacto"));

router.use("/reservas", require("./api/reservas"));

router.use("/blog", require("./api/blog"));

// router.use("/staff", require("./api/staff"));

module.exports = router;
