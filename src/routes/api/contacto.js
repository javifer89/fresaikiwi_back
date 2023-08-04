const router = require("express").Router();

const contactoController = require("../../controllers/contacto.controller");


//GET
router.get("/id/:formId", contactoController.getFormulario);


//POST
router.post("/", contactoController.create);





module.exports = router;
