const PeliculasRoutes = require("express").Router();
const upload = require("../../middleware/file");
const { authorize } = require("../../middleware/auth");
const rateLimit = require("express-rate-limit");

const peliculaCreateRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
});

const {
  getAllPeliculas,
  getPeliculaByID,
  createPelicula,
  updatePeliculas,
  deletePelicula,
} = require("./pelicula.controller");

PeliculasRoutes.get("/getAll", [authorize], getAllPeliculas);
PeliculasRoutes.get("/:id", [authorize], getPeliculaByID);
PeliculasRoutes.post(
  "/create",
  [authorize, peliculaCreateRateLimit],
  upload.single("img"),
  createPelicula
);
PeliculasRoutes.patch("/:id", [authorize], updatePeliculas);
PeliculasRoutes.delete("/:id", [authorize], deletePelicula);

module.exports = PeliculasRoutes;
