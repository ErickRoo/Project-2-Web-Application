//1 --  Importaciones

const mongoose = require("mongoose");

//2 -- Schema

const userSchema = mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, "The username is required"],
    },
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    lastname: {
      type: String,
      required: [true, "The lastname is required"],
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "The password is required"],
    },
    category: {
      type: String,
      enum: ["admin", "Creador", "Consumidor"],
      required: [true, "The category is required"],
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post.model",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//3 -- Modelo

const User = mongoose.model("User", userSchema);

//4 -- Exportación

module.exports = User;
