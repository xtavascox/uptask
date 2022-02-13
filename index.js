const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

//helpers con algunas funciones
const helpers = require("./helpers");

//Crear la conexion a la BD

const db = require("./config/db");
// importar el modelo
require("./models/Proyectos");

db.sync()
  .then(() => console.log("conectado al servidor"))
  .catch((error) => console.log(error));

//crear un app de express
const app = express();

//donde cargar los archivos estaticos
app.use(express.static("public"));

//habilitar pug
app.set("view engine", "pug");

//añadir la carpeta de vistas
app.set("views", path.join(__dirname, "./views"));

//pasar var_dump  a la aplicacion
app.use((req, res,next) => {
  res.locals.vardump = helpers.vardump;
  next();
});

//habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes());

app.listen(3000);
