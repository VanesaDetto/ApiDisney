const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  descripcion: { type: String, required: true },
  year: { type: Number },
});

module.exports = mongoose.model("peliculas", schema);
