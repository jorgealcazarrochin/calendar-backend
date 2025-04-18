const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// * Crear el servidor de express

const app = express();

//  * Base de datos
dbConnection();

// * CORS
app.use(cors());

//  * Directorio público para ver
app.use(express.static("public"));

// * Lectura y parseo del boy
app.use(express.json());

// * Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// * Escuchar peticiones (express)

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
