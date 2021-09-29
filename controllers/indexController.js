const Beer = require("../models/beer.model");

const Post = require("../models/post.model");

const User = require("../models/user.model");

exports.home = async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(`Hubo un error al cargar el HOME: ${error}`);
  }
};

exports.beerList = async (req, res) => {
  try {
    const listBeers = await Beer.find({}).populate("author");
    res.render("beer/beer-list", { listBeers });
  } catch (error) {
    console.log(`Hubo un error en ver las listas de cervezas: ${error}`);
  }
};

exports.beerDetails = async (req, res) => {
  try {
    const beerDetails = await Beer.findById(req.params.id)
      .populate("author comments")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      });
    // console.log(beerDetails);
    return res.render("beer/beer-details", beerDetails);
  } catch (error) {
    console.log(`Hubo un error ver detalles de la cerveza: ${error}`);
  }
};

exports.beerComment = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await Post.create({
      author: req.session.currentUser,
      title,
      content,
      imageUrl: req.file.path,
    });
    const pushCommentUser = await User.findByIdAndUpdate(
      req.session.currentUser,
      {
        $push: { posts: newPost._id },
      },
      { new: true }
    );
    const pushCommentBeer = await Beer.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: newPost._id },
      },
      { new: true }
    );
    res.redirect(`/beers/commentaries/${req.params.id}`);
  } catch (error) {
    console.log(`Hubo un error al comentar la cerveza: ${error}`);
  }
};
