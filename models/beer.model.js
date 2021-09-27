//1 -- Importaciones

const mongoose = require("mongoose");

//2 -- Schema
const beerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre del producto es requerido"],
  },
  style: {
    type: String,
    required: [true, "El estilo del producto es requerido"],
  },
  abv: {
    type: Number,
    required: [true, "El ABV del producto es requerido"],
  },
  ibu: {
    type: Number,
    required: [true, "El IBU del producto es requerido"],
  },
  description: {
    type: String,
  },
  pairing: {
    type: String,
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//3 -- Modelo

const Beer = mongoose.model("Beer", beerSchema);

//4 -- Exportación

module.exports = Beer;
