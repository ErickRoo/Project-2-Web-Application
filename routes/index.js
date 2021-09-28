//Llamar a las rutas de app.js

const router = require("express").Router();

const indexController = require("../controllers/indexController");
/* Este es el HOME */

const fileUploader = require("../config/cloudinary.config");

router.get("/", indexController.home);

router.get("/beers", indexController.beerList);

router.get("/beers/commentaries/:id", indexController.beerDetails);

router.post(
  "/beers/commentaries/:id",
  fileUploader.single("imageUrlPost"),
  indexController.beerComment
);

//Exportación

module.exports = router;
