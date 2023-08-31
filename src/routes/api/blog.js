const router = require("express").Router();

const blogController = require("../../controllers/blog.controller");

const { checkTokenUsuario, checkToken } = require("../../helpers/middlewares");


//GET
router.get("/", blogController.getAll);
router.get("/:id_post", /*checkTokenUsuario,*/ blogController.getById);
router.get("/:categoria",/*checkTokenUsuario,*/ blogController.getByCategory);

//POST
router.post("/", /*checkTokenUsuario,*/ blogController.create);


//PUT
router.put("/editar/:id_post", /*checkTokenUsuario,*/ blogController.update);
router.put('/aceptar/:id_post', /*checkToken,*/ blogController.aceptar);

//DELETE
router.delete("/:id_post", /*checkTokenUsuario,*/ blogController.remove);

module.exports = router;
