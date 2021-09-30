/*
 **** Archivo de importaciones y rutas
 */

//1 -- Importaciones

const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const connectingDB = require("./db/db");

//2 -- Middlewares

require("dotenv").config();

connectingDB();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");

hbs.registerPartials(path.join(__dirname, "/views/partials"));

app.use(express.urlencoded({ extended: true }));

// f. ACTIVAR GESTIÓN DE SESIONES
require("./config/session.config")(app);

// g. ESTABLECER EL VALOR DE REQ.SESSION EN LAYOUT.HBS, A TRAVÉS DEL USO DE RES.LOCALS
// Layout Middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  // console.log(req.session.currentUser);
  next();
});

// 3 -- Rutas

app.use("/", require("./routes/index"));
app.use("/beer", require("./routes/beer"));
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

require("./error-handling/error")(app);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

// Exportación de app para archivos ...
module.exports = app;
