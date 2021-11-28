const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    require: true,
  },
  lname: {
    type: String,
    require: true,
  },
  pincode: {
    type: String,
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
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",
  },
  age: { type: Number },
  nurse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nurse",
  },
  isVaccinated: {
    type: Boolean,
  },
  vaccine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vaccine",
  },
  vaccineCenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VaccineCenter",
  },
});
//return public data of the user (object/instance)
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
//(instance) method accessable by our individual object(user) of Model(User)
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, "LOLZ");
  return token;
};

//static method accessible by our Model(User)
userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Unable to login");
    }
    return user;
  } catch (e) {
    // console.log(e);
  }
};

//hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  //if user has modified the password
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next(); //signifies end ofthe middle process just before save is executed
});
const User = mongoose.model("User", userSchema);
module.exports = User;
