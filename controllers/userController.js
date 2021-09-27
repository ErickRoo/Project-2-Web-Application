// controllers/userController.js

exports.createProfile = async (req, res) => {
  console.log(req.session.currentUser.category);
  if (req.session.currentUser.category === "Creador") {
    res.render("users/profile-creador", { foundUser: req.session.currentUser });
  } else if (req.session.currentUser.category === "Consumidor") {
    res.render("users/profile-consumidor", {
      foundUser: req.session.currentUser,
    });
  }
};
