//Llamar a las rutas de app.js

const router = require("express").Router();

/* Este es el HOME */

router.get("/", (req, res) => {
  res.render("index");
});

//Exportación

module.exports = router;
