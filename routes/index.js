//Llamar a las rutas de app.js

const router = require("express").Router();

const indexController = require("../controllers/indexController");
/* Este es el HOME */

router.get("/", indexController.home);

router.get("/cervezas", indexController.beerList);

//Exportación

module.exports = router;
