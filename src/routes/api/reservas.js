const router = require("express").Router();

const reservasController = require("../../controllers/reservas.controller");

const { checkTokenUsuario, checkToken } = require("../../helpers/middlewares");


//GET
router.get("/", reservasController.getAll);
router.get("/:id_reserva", /*checkTokenUsuario,*/ reservasController.getById);

//POST
router.post("/", /*checkTokenUsuario,*/ reservasController.create);


//PUT
router.put("/editar/:id_reserva", /*checkTokenUsuario,*/ reservasController.update);
router.put('/aceptar/:id_reserva', /*checkToken,*/ reservasController.aceptar);

//DELETE
router.delete("/:id_reserva", /*checkTokenUsuario,*/ reservasController.remove);

module.exports = router;
