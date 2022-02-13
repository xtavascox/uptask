const Proyectos = require("../models/Proyectos");
const slug = require("slug");

exports.proyectosHome = async (req, res) => {
  const proyectos = await Proyectos.findAll();

  res.render("index", { nombrePagina: "Proyectos", proyectos });
};
exports.formularioProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render("nuevoProyecto", { nombrePagina: "Nuevo Proyecto", proyectos });
};

exports.nuevoProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  //Enviar a la consola lo que el usuario escriba
  const { nombre } = req.body;

  let errores = [];
  if (!nombre) {
    errores.push({ texto: "agrega un texto al proyectyo", proyectos });
  }

  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos,
    });
  } else {
    //no hay errores
    //Insertar en la base de datos

    await Proyectos.create({ nombre });
    res.redirect("/");
  }
};

exports.proyectoUrl = async (req, res, next) => {
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });
  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  if (!proyecto) {
    res.send("404 not found");
    return next();
  }
  res.render("tareas", {
    nombrePagina: "Tareas del proyecto",
    proyecto,
    proyectos,
  });
};

exports.formularioEditar = async (req, res) => {
  const proyectosPromise = Proyectos.findAll();

  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });
  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  res.render("nuevoProyecto", {
    nombrePagina: "Editar Proyecto",
    proyectos,
    proyecto,
  });
};

exports.actualizarProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  //Enviar a la consola lo que el usuario escriba
  const { nombre } = req.body;

  let errores = [];
  if (!nombre) {
    errores.push({ texto: "agrega un texto al proyectyo", proyectos });
  }

  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos,
    });
  } else {
    //no hay errores
    //Insertar en la base de datos

    await Proyectos.update(
      { nombre: nombre },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect(`/proyecto/editar/${req.params.id}`);
  }
};
