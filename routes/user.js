const express = require("express");
const router = express.Router();

const userController = require("./../controllers/userController");

const routeGuards = require("./../middlewares/route-guard");

// GET - Obtener perfil del usuario

router.get(
  "/profile/:category/:id",
  routeGuards.isLoggedIn,
  userController.createProfile
);

router.get(
  "/profile/:category/:id/mybeers",
  routeGuards.isLoggedIn,
  userController.mybeers
);

router.get(
  "/profile/:category/:id/editproduct",
  routeGuards.isLoggedIn,
  userController.editBeer
);

//Hacer post para editar producto

module.exports = router;
