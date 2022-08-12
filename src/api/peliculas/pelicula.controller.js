const Pelicula = require("./pelicula.model");
const { setError } = require("../../helpers/utils/error");
const multer = require("multer");
const { deleteFile } = require("../../middleware/delete-file");

const getAllPeliculas = async (req, res, next) => {
  try {
    const peliculas = await Pelicula.find();
    return res.json({
      status: 200,
      message: "Recover all peliculas",
      data: { peliculas },
    });
  } catch (error) {
    return next(setError(500, "Failed all Peliculas"));
  }
};

const getPeliculaByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pelicula = await Pelicula.findById(id);
    if (!pelicula) return next(setError(404, "Pelicula not found"));
    return res.json({
      status: 200,
      message: "Recover  pelicula by ID",
      data: { pelicula },
    });
  } catch (error) {
    return next(setError(500, "Failed Pelicula by ID"));
  }
};

const createPelicula = async (req, res, next) => {
  try {
    const PeliculaToSave = new Pelicula(req.body);
    if (req.file) PeliculaToSave.img = req.file.path;
    const peliculaDB = await PeliculaToSave.save();
    return res.json({
      status: 201,
      message: "Created pelicula",
      data: { peliculaDB },
    });
  } catch (error) {
    return next(setError(500, error.message || "Failed created new pelicula"));
  }
};

const updatePeliculas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pelicula = new Pelicula(req.body);
    pelicula._id = id;
    if (req.file) pelicula.img = req.file.path;
    const updatedPelicula = await Pelicula.findByIdAndUpdate(id, pelicula);
    if (!updatedPelicula) return next(setError(404, "Pelicula not found"));
    return res.json({
      status: 201,
      message: "Updated pelicula",
      data: { anime: updatedPelicula },
    });
  } catch (error) {
    return next(setError(500, "Failed updated pelicula"));
  }
};

const deletePelicula = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedPelicula = await Pelicula.findByIdAndDelete(id);
    if (deletedPelicula.img) deleteFile(deletedPelicula.img);
    if (!deletedPelicula) return next(setError(404, "Pelicula not found"));

    return res.json({
      status: 200,
      message: "Deleted pelicula",
      data: deletedPelicula,
    });
  } catch (error) {
    return next(setError(500, error.message || ""));
  }
};

module.exports = {
  getAllPeliculas,
  getPeliculaByID,
  createPelicula,
  updatePeliculas,
  deletePelicula,
};
