//1 -- Importaciones

const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user.model",
  },
  title: String,
  content: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});
