const mongoose = require("mongoose");

const vaccineCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  pincode: {
    type: String,
  },
  phone_number: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },

  slots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
    },
  ],
  nurse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nurse",
    },
  ],
  vaccine: {
    type: mongoose.Schema.Types.ObjectId,
  },
  capacity_per_slot: {
    type: Number,
  },
});
const VaccineCenter = mongoose.model("VaccineCenter", vaccineCenterSchema);
module.exports = VaccineCenter;
