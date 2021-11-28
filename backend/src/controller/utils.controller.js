const mongoose = require("mongoose");
const Nurse = require("../models/nurse");
const Slot = require("../models/slot");
const User = require("../models/user");
const VaccineCenter = require("../models/vaccine_center");

const getAllSlotsController = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.send({ message: "", data: slots, error: null });
  } catch (e) {
    res
      .status(404)
      .send({ message: "An Error Occured!", data: null, error: e });
  }
};
const RegisterUserVaccineSlotController = async (req, res) => {
  try {
    if (req.user.isVaccinated) {
      throw "Already Vaccinated";
    }
    if (req.user.nurse) {
      throw "Already Registered";
    }
    req.user.slot = req.body.slotID;
    req.user.vaccineCenter = req.body.vaccineCenterID;
    let nurseUnAvailable = true;
    const slot = await Slot.findById(req.body.slotID).populate("nurse");
    for (let nurse of slot.nurse) {
      if (String(nurse.vaccineCenter) === String(req.user.vaccineCenter)) {
        req.user.nurse = nurse._id;
        nurseUnAvailable = false;
        break;
      }
    }
    if (nurseUnAvailable) {
      throw "No Nurse Appointed to center in this slot";
    }
    slot.users.push(req.user._id);
    await slot.save();
    await req.user.save();
    res.send({ message: "", data: { slot, user: req.user }, error: null });
  } catch (e) {
    res
      .status(404)
      .send({ message: "An Error Occured!", data: null, error: e });
  }
};
const GetUsersToVaccinateController = async (req, res) => {
  try {
    const slot = await Slot.findById(req.body.slotID).populate("users");
    await req.nurse.populate("slots");

    console.log(slot);
    const users = slot.users.filter(
      (user) => String(user.nurse) === String(req.nurse._id)
    );
    console.log(users);
    res.send({ message: "", data: users, error: null });
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .send({ message: "An Error Occured!", data: null, error: e });
  }
};
const VaccinateUserController = async (req, res) => {
  try {
    const user = await User.findById(req.body.userID);
    user.isVaccinated = true;
    user.save();

    res.send({ message: "", data: user, error: null });
  } catch (e) {
    res
      .status(404)
      .send({ message: "An Error Occured!", data: null, error: e });
  }
};
const NurseLoginController = async (req, res) => {
  try {
    const nurse = await Nurse.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await nurse.generateAuthToken();
    res
      .status(200)
      .send({ message: "Signed in successfully ", data: { nurse, token } });
  } catch (e) {
    res
      .status(404)
      .send({ message: "An Error Occured!", data: null, error: e });
  }
};
const UserLoginController = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res
      .status(200)
      .send({ message: "Signed in successfully ", data: { user, token } });
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .send({ message: "An Error Occured!", data: null, error: e });
  }
};
const GetUserProfileController = async (req, res) => {
  res.send({
    message: "Profile retrieved succesfully!",
    data: req.user,
    error: null,
  });
};
const GetNurseProfileController = async (req, res) => {
  await req.nurse.populate(["slots", "vaccineCenter"]);
  res.send({
    message: "Profile retrieved succesfully!",
    data: req.nurse,
    error: null,
  });
};
const GetVccineCentersController = async (req, res) => {
  const vaccine_centers = await VaccineCenter.find().populate("slots");
  res.send({
    message: "Vaccine Centers Retreived Successfully",
    data: vaccine_centers,
    error: null,
  });
};

module.exports = {
  VaccinateUserController,
  GetUsersToVaccinateController,
  getAllSlotsController,
  RegisterUserVaccineSlotController,
  NurseLoginController,
  UserLoginController,
  GetNurseProfileController,
  GetUserProfileController,
  GetVccineCentersController,
};
