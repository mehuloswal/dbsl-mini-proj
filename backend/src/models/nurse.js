const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nurseSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  phone_number: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    require: true,
  },
  slots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
    },
  ],
  vaccineCenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VaccineCenter",
  },
});
//return public data of the nurse (object/instance)
nurseSchema.methods.toJSON = function () {
  const nurse = this;
  const nurseObject = nurse.toObject();
  delete nurseObject.password;
  return nurseObject;
};
//(instance) method accessable by our individual object(user) of Model(User)
nurseSchema.methods.generateAuthToken = async function () {
  const nurse = this;
  try {
    const token = jwt.sign({ _id: nurse.id.toString() }, "LOLZ");
    return token;
  } catch (e) {
    // console.log(e);
  }
};

//static method accessible by our Model(User)
nurseSchema.statics.findByCredentials = async (email, password) => {
  try {
    const nurse = await Nurse.findOne({ email });
    if (!nurse) {
      throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, nurse.password);
    if (!isMatch) {
      throw new Error("Unable to login");
    }
    return nurse;
  } catch (e) {
    // console.log(e);
  }
};

//hash the plain text password before saving
nurseSchema.pre("save", async function (next) {
  const nurse = this;

  //if nurse has modified the password
  if (nurse.isModified("password")) {
    nurse.password = await bcrypt.hash(nurse.password, 8);
  }
  next(); //signifies end ofthe middle process just before save is executed
});
const Nurse = mongoose.model("Nurse", nurseSchema);
module.exports = Nurse;
