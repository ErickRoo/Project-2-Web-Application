exports.home = async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(`Hubo un error al cargar el HOME: ${error}`);
  }
};

exports.beerList = async (req, res) => {
  try {
    res.render("beer-list");
  } catch (error) {
    console.log(`Hubo un error en ver las listas de cervezas: ${error}`);
  }
};
