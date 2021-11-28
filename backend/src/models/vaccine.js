const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  ingredients: {
    type: String,
    require: true,
  },
  cost: {
    type: Number,
  },
});
const Vaccine = mongoose.model("Vaccine", vaccineSchema);
module.exports = Vaccine;
