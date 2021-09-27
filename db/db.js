const mongoose = require("mongoose");

const connectingDB = async () => {
  // ERROR HANDLING - try catch - node.js
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return console.log(
      `Conectados a la base de datos: ${db.connections[0].name}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectingDB;
