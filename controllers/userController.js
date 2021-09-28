// controllers/userController.js

const Beer = require("../models/beer.model");

exports.createProfile = async (req, res) => {
  // console.log(req.session.currentUser.category);
  try {
    if (req.session.currentUser.category === "Creador") {
      res.render("users/profile-creador", {
        foundUser: req.session.currentUser,
      });
    } else if (req.session.currentUser.category === "Consumidor") {
      res.render("users/profile-consumidor", {
        foundUser: req.session.currentUser,
      });
    }
  } catch (error) {
    console.log(`Hubo un error en cargar perfil: ${error}`);
  }
};

exports.mybeers = async (req, res) => {
  // console.log(req.session.currentUser._id);
  try {
    const myBeers = await Beer.find({
      author: req.session.currentUser._id,
    }).populate("author"); //Para que el populate() funcione correctamente, en el modelo se tiene que hacer referencia al ObjectId y al modelo-padre
    res.render("beer/mybeers", { myListBeers: myBeers });
  } catch (error) {
    console.log(`Hubo un error en ver lista de productos: ${error}`);
  }
};

exports.editBeer = async (req, res) => {
  try {
    res.render("beer/beer-edit");
  } catch (error) {
    console.log(`Hubo un error al editar producto: ${error}`);
  }
};
