//Llamar a las rutas de app.js

const router = require("express").Router();

const indexController = require("../controllers/indexController");

const fileUploader = require("../config/cloudinary.config");

router.get("/", indexController.home);

router.get("/beers", indexController.beerList);

router.get("/beers/commentaries/:idBeer", indexController.beerDetails);

router.post(
  "/beers/commentaries/:idBeer",
  fileUploader.single("imageUrlPost"),
  indexController.beerComment
);

// router.post("/beers/commentaries/:id/delete", )
//Exportación

module.exports = router;
