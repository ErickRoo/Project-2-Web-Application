/*
 **** Archivo de importaciones y rutas
 */

//1 -- Importaciones

const express = require("express");
const app = express();
const hbs = require("hbs");
const connectingDB = require("./db/db");

//2 -- Middlewares

require("dotenv").config();

connectingDB();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

// g. ESTABLECER EL VALOR DE REQ.SESSION EN LAYOUT.HBS, A TRAVÉS DEL USO DE RES.LOCALS
// Layout Middleware
// app.use((req, res, next) => {
//   res.locals.currentUser = req.session.currentUser;

//   next();
// });

// 3 -- Rutas

app.use("/", require("./routes/index"));
app.use("/beer", require("./routes/beer"));
// app.use("/auth", require("./routes/auth"));
// app.use("/user", require("./routes/user"));

require("./error-handling/error")(app);

// Exportación de app para archivos ...
module.exports = app;
