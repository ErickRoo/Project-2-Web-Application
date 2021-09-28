const express = require("express");
const router = express.Router();

const beerController = require("../controllers/beerController");

const routeGuards = require("./../middlewares/route-guard");

const fileUploader = require("../config/cloudinary.config");

router.get("/create", routeGuards.isLoggedIn, beerController.getCreate);

router.post(
  "/create",
  fileUploader.single("imageUrlBeer"),
  beerController.postCreate
);

module.exports = router;
