const bcryptjs = require("bcryptjs"); // Variable requerida para encriptación
const saltRounds = 10; // Numero de veces para generar la encriptación

const User = require("./../models/user.model");

exports.createUser = async (req, res) => {
  res.render("auth/signup");
};

exports.createUserForm = async (req, res) => {
  try {
    // 1. OBTENER LOS DATOS DEL FORMULARIO
    const { nickname, name, lastname, email, password, category } = req.body;

    // 2. ENCRIPTACIÓN DE LA VARIABLE PASSWORD

    // ESTE ES LA BASE DE LA ENCRIPTACION
    // $2a$10$H9jg8k0zOgo8346atEKSwu
    const salt = await bcryptjs.genSalt(saltRounds);

    // MEZCLA DEL PASSWORD CON NUESTRA SALT
    // ESTE PASSWORD NO PUEDE SER REVERSIBLE
    const hashedPassword = await bcryptjs.hash(password, salt);

    // 3. INSERTAR EL USUARIO, CON SU PASSWORD ENCRIPTADO, EN BASE DE DATOS
    // console.log(req.file.path);//ruta de cloudinary con img cargada
    const newUser = await User.create({
      nickname,
      name,
      lastname,
      email,
      passwordHash: hashedPassword,
      category,
      imageUrl: req.file.path,
    });

    // console.log(newUser);

    // 4. RETORNAR UNA PÁGINA O UNA REDIRECCIÓN PARA QUE EL USUARIO SEPA QUE LO HIZO BIEN
    // res.alert("Usuario creado");
    res.redirect("/");
  } catch (error) {
    console.log(`Hubo un error en signup: ${error}`);
  }
};

exports.loginUser = async (req, res) => {
  res.render("auth/login");
};

exports.loginUserForm = async (req, res) => {
  // 1. OBTENER LAS DATOS DEL FORMULARIO
  const { email, password } = req.body;

  // 2. REALIZAR UNA VALIDACIÓN DE QUE NO HAYA DATOS VACÍOS
  if (email === "" || password === "") {
    return res.render("auth/login", {
      errorMessage: "Tienes campos vacíos. Debes llenarlos.",
    });
  }

  // 3. SI TODO BIEN, ENTONCES.... BUSQUEMOS AL USUARIO EN BASE DE DATOS

  try {
    const foundUser = await User.findOne({ email });

    // SI EL USUARIO NO EXISTE..., ES MANDAR UN MENSAJE DE ERROR AL USUARIO
    if (!foundUser) {
      return res.render("auth/login", {
        errorMessage: "El usuario no está registado.",
      });
    }

    // 4. SI ES ENCONTRADO, ENTONCES... COMPARACIÓN DE CONTRASEÑA DE FORMULARIO VS LA CONTRASEÑA DE BASE DE DATOS
    const isItMatched = await bcryptjs.compareSync(
      password,
      foundUser.passwordHash
    );

    // SI LA CONTRASEÑA NO COINCIDE...
    if (isItMatched === false) {
      return res.render("auth/login", {
        errorMessage:
          "El usuario o la contraseña son erróneas. Intenta nuevamente",
      });
    }

    // 5. SI LA CONTRASEÑA COINCIDE, ENTONCES... CREAR UNA SESIÓN Y RETORNAR PÁGINA DE ÉXITO

    // console.log(req)
    req.session.currentUser = foundUser;
    // console.log(foundUser.id);

    return res.redirect(`/user/profile/${foundUser.category}/${foundUser.id}`);
  } catch (error) {
    // 6. EN CASO DE FALLOS, REALIZAMOS MANEJO DE ERRORES (ERROR HANDLING)
    console.log(`Hubo un error en hacer login: ${error}`);
  }
};

exports.logoutUser = (req, res) => {
  // ELIMINAR LA COOKIE DEL NAVEGADOR
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/");
  });
};
