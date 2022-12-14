const UsersRoutes = require("express").Router();
const rateLimit = require("express-rate-limit");
const { authorize } = require("../../middleware/auth");
const {
  getAllUser,
  userByEmail,
  register,
  login,
  update,
  remove,
} = require("../users/user.controller");

const userCreateRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
});

UsersRoutes.get("/getAll", getAllUser);
UsersRoutes.get("/:email", [authorize], userByEmail);
UsersRoutes.post("/register", [userCreateRateLimit], register);
UsersRoutes.post("/login", login);
UsersRoutes.patch("/update/:id", [authorize], update);
UsersRoutes.delete("/delete/:email", [authorize], remove);

module.exports = UsersRoutes;
