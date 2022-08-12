const Princesa = require("./princesa.model");

const { setError } = require("../../helpers/utils/error");
const multer = require("multer");
const { deleteFile } = require("../../middleware/delete-file");

const getAllPrincesas = async (req, res, next) => {
  try {
    const princesas = await Princesa.find();
    return res.json({
      status: 200,
      message: "All princesas",
      data: { princesas },
    });
  } catch (error) {
    return next(setError(500, error.message || "Failed recover all Princesas"));
  }
};

const getPrincesaByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const princesa = await Princesa.findById(id);
    if (!princesa) return next(setError(404, "Princesa not found"));
    return res.json({
      status: 200,
      message: "Recover  princesa by ID",
      data: { princesa },
    });
  } catch (error) {
    return next(setError(500, "Failed Princesa by ID"));
  }
};

const createPrincesa = async (req, res, next) => {
  try {
    const PrincesaToSave = new Princesa(req.body);
    if (req.file) PrincesaToSave.img = req.file.path;
    const princesaDB = await PrincesaToSave.save();
    return res.json({
      status: 201,
      message: "Created princesa",
      data: princesaDB,
    });
  } catch (error) {
    return next(setError(500, error.message || "Failed created new princesa"));
  }
};

const updatePrincesa = async (req, res, next) => {
  try {
    const { id } = req.params;
    const princesa = new Princesa(req.body);
    princesa._id = id;
    if (req.file) princesa.img = req.file.path;
    const updatePrincesa = await Princesa.findByIdAndUpdate(id, princesa);
    if (!updatePrincesa) return next(setError(404, "Princesa not found"));
    return res.json({
      status: 201,
      message: "Update princesa",
      data: updatePrincesa,
    });
  } catch (error) {
    return next(setError(500, error.message || "Failed update princesa"));
  }
};

const removePrincesa = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedPrincesa = await Princesa.findByIdAndDelete(id);
    if (deletedPrincesa.img) deleteFile(deletedPrincesa.img);
    if (!deletedPrincesa) return next(setError(404, "Princesa not found"));

    return res.json({
      status: 200,
      message: "Deleted princesa",
      data: deletedPrincesa,
    });
  } catch (error) {
    return next(setError(500, error.message || ""));
  }
};

module.exports = {
  getAllPrincesas,
  getPrincesaByID,
  createPrincesa,
  updatePrincesa,
  removePrincesa,
};
