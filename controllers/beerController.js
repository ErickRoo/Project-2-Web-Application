const Beer = require("../models/beer.model");

exports.getCreate = async (req, res) => {
  try {
    res.render("beer/create-beer");
  } catch (error) {
    console.log(`Hubo un error al entrar a crear: ${error}`);
  }
};

exports.postCreate = async (req, res) => {
  const { name, style, abv, ibu, description, pairing } = req.body;
  try {
    const newBeer = await Beer.create({
      name,
      style,
      abv,
      ibu,
      description,
      pairing,
    });
    res.render("beer/mybeers");
  } catch (error) {
    console.log(`Error al mandar el formulario (post): ${error}`);
  }
};
