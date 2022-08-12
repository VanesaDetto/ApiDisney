const PrincesasRoutes = require("express").Router();
const upload = require("../../middleware/file");
const { authorize } = require("../../middleware/auth");
const rateLimit = require("express-rate-limit");

const princesaCreateRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
});

const {
  getAllPrincesas,
  getPrincesaByID,
  createPrincesa,
  updatePrincesa,
  removePrincesa,
} = require("./princesa.controller");

PrincesasRoutes.get("/getAll", [authorize], getAllPrincesas);
PrincesasRoutes.get("/:id", [authorize], getPrincesaByID);
PrincesasRoutes.post(
  "/create",
  [authorize, princesaCreateRateLimit],
  upload.single("img"),
  createPrincesa
);
PrincesasRoutes.patch(
  "/:id",
  [authorize],
  upload.single("img"),
  updatePrincesa
);
PrincesasRoutes.delete("/:id", [authorize], removePrincesa);

module.exports = PrincesasRoutes;
