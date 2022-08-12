const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: { type: String, require: true },
    img: { type: String, require: true },
    descripcion: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("princesa", schema);
