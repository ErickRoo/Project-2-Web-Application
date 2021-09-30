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
    // console.log(myBeers);
    res.render("beer/mybeers", { myListBeers: myBeers });
  } catch (error) {
    console.log(`Hubo un error en ver lista de productos: ${error}`);
  }
};

exports.editBeerGet = async (req, res) => {
  try {
    const editBeer = await Beer.findById(req.params.idProduct).populate(
      "author"
    );
    // console.log(editBeer);
    res.render("beer/beer-edit", editBeer);
  } catch (error) {
    console.log(`Hubo un error al editar producto: ${error}`);
  }
};

exports.editBeerPost = async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  const { name, style, abv, ibu, description, pairing, imageUrl } = req.body;
  try {
    const updateBeer = await Beer.findByIdAndUpdate(req.params.idProduct, {
      name,
      style,
      abv,
      ibu,
      description,
      pairing,
    });
    res.redirect(
      `/user/profile/${req.params.category}/${req.params.idUser}/mybeers`
    );
  } catch (error) {
    console.log(`Hay un error en actualizar el producto: ${error}`);
  }
};

exports.deleteBeerPost = async (req, res) => {
  // console.log(req.params);
  try {
    const deleteBeer = await Beer.findByIdAndRemove(req.params.idProduct);
    res.redirect(
      `/user/profile/${req.params.category}/${req.params.idUser}/mybeers`
    );
  } catch (error) {
    console.log(`Hubo un error al eliminar cerveza: ${error}`);
  }
};
