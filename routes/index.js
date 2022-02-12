const express = require("express");
const router = express.Router();
const { proyectosHome } = require("../controllers/proyectosController");
module.exports = function () {
    
  //ruta para el home
  router.get("/", proyectosHome);



  return router;
};
