const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    console.log(process.env.DB_CONNECTION);
    await mongoose.connect(process.env.DB_CONNECTION);

    console.log("DB ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar base de datos");
  }
};

module.exports = { dbConnection };
