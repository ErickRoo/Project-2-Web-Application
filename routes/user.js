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
  "/profile/:category/:idUser/mybeers",
  routeGuards.isLoggedIn,
  userController.mybeers
);

router.get(
  "/profile/:category/:idUser/:idProduct/editproduct",
  routeGuards.isLoggedIn,
  userController.editBeerGet
);

router.post(
  "/profile/:category/:idUser/:idProduct/editproduct",
  userController.editBeerPost
);

router.post(
  "/profile/:category/:idUser/:idProduct/delete",
  userController.deleteBeerPost
);

module.exports = router;
