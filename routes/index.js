const express = require("express");
const router = express.Router();
const {
  proyectosHome,
  formularioProyecto,
  nuevoProyecto,
  proyectoUrl,
  formularioEditar,
  actualizarProyecto
} = require("../controllers/proyectosController");
const { body } = require("express-validator");
const { route } = require("express/lib/application");
module.exports = function () {
  //ruta para el home
  router.get("/", proyectosHome);

  router.get("/nuevo-proyecto", formularioProyecto);

  router.post(
    "/nuevo-proyecto",
    body("nombre").not().isEmpty().trim().escape(),
    nuevoProyecto
  );
  //listarProyecto
  router.get('/proyectos/:url',proyectoUrl)
  
  //actualizar proyecto
    router.get('/proyecto/editar/:id',formularioEditar);
    router.post(
      "/nuevo-proyecto/:id",
      body("nombre").not().isEmpty().trim().escape(),
      actualizarProyecto
    );

  return router;
};
