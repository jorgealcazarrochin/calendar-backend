const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jorge-alcazar:jdar110700.@chat-server.agmhz.mongodb.net/mern-calendar"
    );

    console.log("DB ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar base de datos");
  }
};

module.exports = { dbConnection };
