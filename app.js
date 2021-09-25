/*
 **** Archivo de importaciones y rutas
 */

//1 -- Importaciones

const express = require("express");
const app = express();
const hbs = require("hbs");

//2 -- Middlewares

require("dotenv").config();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

// 3 -- Rutas

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/profile", require("./routes/profile"));

// require("./error-handling")(app);

// Exportación de app para archivos ...
module.exports = app;
