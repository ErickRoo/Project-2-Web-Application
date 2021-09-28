const Beer = require("../models/beer.model");

exports.home = async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(`Hubo un error al cargar el HOME: ${error}`);
  }
};

exports.beerList = async (req, res) => {
  try {
    const listBeers = await Beer.find({});
    res.render("beer/beer-list", { listBeers });
  } catch (error) {
    console.log(`Hubo un error en ver las listas de cervezas: ${error}`);
  }
};

exports.beerDetails = async (req, res) => {
  try {
    const beerDetails = await Beer.findById(req.params.id);
    return res.render("beer/beer-details", beerDetails);
  } catch (error) {
    console.log(`Hubo un error ver detalles de la cerveza: ${error}`);
  }
};

exports.beerComment = async (req, res) => {
  try {
  } catch (error) {
    console.log(`Hubo un error al comentar la cerveza: ${error}`);
  }
};
