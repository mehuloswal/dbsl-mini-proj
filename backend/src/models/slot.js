const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  nurse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nurse",
    },
  ],
  duration: {
    type: String,
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;
