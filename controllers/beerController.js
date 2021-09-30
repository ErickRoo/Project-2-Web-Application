const Beer = require("../models/beer.model");

const User = require("../models/user.model");

exports.getCreate = async (req, res) => {
  try {
    res.render("beer/create-beer");
  } catch (error) {
    console.log(`Hubo un error al entrar a crear: ${error}`);
  }
};

exports.postCreate = async (req, res) => {
  const { author, name, style, abv, ibu, description, pairing } = req.body;
  // console.log(req.session.currentUser._id);
  try {
    // console.log(req);
    // if (req.file.path == undefined) {
    //   req.file.path = "../public/images/defaultBeer.png";
    // }
    const newBeer = await Beer.create({
      author: req.session.currentUser._id,
      name,
      style,
      abv,
      ibu,
      description,
      pairing,
      imageUrl: req.file?.path,
    });
    //Poner aviso de registro exitoso
    res.render("beer/create-beer");
  } catch (error) {
    console.log(`Error al mandar el formulario (post): ${error}`);
  }
};
