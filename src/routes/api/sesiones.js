const router = require('express').Router();

const sesionesController = require('../../controllers/sesiones.controller');
const { checkToken } = require('../../helpers/middlewares');

//GET
router.get("/", sesionesController.getAll)
router.get("/:sesionId", sesionesController.getById);

//POST
router.post("/", /*checkToken,*/ sesionesController.create);
router.post("/comprobar_sesiones", /*checkToken,*/ sesionesController.comprobarSesion);

//PUT
router.put("/editar/:sesionId", /*checkToken, */sesionesController.update);

//DELETE
router.delete("/:sesionId", /*checkToken,*/ sesionesController.remove);


module.exports = router
