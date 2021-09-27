//1 --  Importaciones

const mongoose = require("mongoose");

//2 -- Schema

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Nombre de usuario requerido"],
  },
  email: {
    type: String,
    required: [true, "El e-mail es requerido"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, "El password es requerido"],
  },
  typeUser: ["Admin", "Vendedor", "Comprador"],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post.model",
    },
  ],
});
