const express = require("express");
const router = express.Router();

const beerController = require("../controllers/beerController");

router.get("/create", beerController.getCreate);

router.post("/create", beerController.postCreate);

module.exports = router;
