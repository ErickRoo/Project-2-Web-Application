//1 -- Importaciones

const mongoose = require("mongoose");

//2 -- Schema
const beerSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: [true, "The beer's name is required"],
    },
    style: {
      type: String,
      required: [true, "The beer's style is required"],
    },
    abv: {
      type: Number,
      required: [true, "The beer's ABV is required"],
    },
    ibu: {
      type: Number,
      required: [true, "The beer's IBU is required"],
    },
    description: {
      type: String,
    },
    pairing: {
      type: String,
    },
    imageUrl: String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//3 -- Modelo

const Beer = mongoose.model("Beer", beerSchema);

//4 -- Exportación

module.exports = Beer;
