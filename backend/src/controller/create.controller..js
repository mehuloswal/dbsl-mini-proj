const Nurse = require("../models/nurse");
const Slot = require("../models/slot");
const User = require("../models/user");
const Vaccine = require("../models/vaccine");
const VaccineCenter = require("../models/vaccine_center");

const createNurseController = async (req, res) => {
  try {
    const nurse_info = {
      name: req.body.name,
      gender: req.body.gender,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
      vaccineCenter: req.body.vaccineCenterID,
      slots: req.body.slots,
    };
    const nurse = await new Nurse(nurse_info);
    await nurse.save();
    const vaccine_center = await VaccineCenter.findById(
      req.body.vaccineCenterID
    );
    req.body.slots.forEach(async (slot_id) => {
      const slot = await Slot.findById(slot_id);
      slot.nurse.push(nurse._id);
      await slot.save();
    });
    vaccine_center.nurse.push(nurse._id);
    await vaccine_center.save();

    const token = await nurse.generateAuthToken();
    res.send({ message: "", data: { nurse, token }, error: null });
  } catch (e) {
    res.status(404).send({ message: "An error occured", data: null, error: e });
  }
};
const createVaccineCenterController = async (req, res) => {
  try {
    const vaccine_center_info = {
      name: req.body.name,
      pincode: req.body.pincode,
      phone_number: req.body.phone_number,
      email: req.body.email,
      slots: req.body.slots,
      nurse: [],
      vaccine: req.body.vaccineID,
      capacity_per_slot: req.body.capacity_per_slot,
    };
    const vaccineCenter = new VaccineCenter(vaccine_center_info);
    await vaccineCenter.save();
    res.send({ message: "", data: vaccineCenter, error: null });
  } catch (e) {
    res.status(404).send({ message: "An error occured", data: null, error: e });
  }
};
const createUserController = async (req, res) => {
  try {
    const user_info = {
      fname: req.body.fname,
      lname: req.body.lname,
      pincode: req.body.pincode,
      gender: req.body.gender,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      isVaccinated: false,
    };
    const user = new User(user_info);
    await user.save();
    const token = await user.generateAuthToken();
    res.send({ message: "", data: { user, token }, error: null });
  } catch (e) {
    console.log(e);
    res.status(404).send({ message: "An error occured", data: null, error: e });
  }
};
const createSlotController = async (req, res) => {
  try {
    const slot_info = {
      nurse: [],
      duration: req.body.duration,
    };
    const slot = new Slot(slot_info);
    await slot.save();
    res.send({ message: "", data: slot, error: null });
  } catch (e) {
    res.status(404).send({ message: "An error occured", data: null, error: e });
  }
};
const createVaccineController = async (req, res) => {
  try {
    const vaccine_info = {
      name: req.body.name,
      ingredients: req.body.ingredients,
      cost: req.body.cost,
    };
    const vaccine = new Vaccine(vaccine_info);
    await vaccine.save();
    res.send({ message: "", data: vaccine, error: null });
  } catch (e) {
    res.status(404).send({ message: "An error occured", data: null, error: e });
  }
};

module.exports = {
  createSlotController,
  createUserController,
  createVaccineCenterController,
  createVaccineController,
  createNurseController,
};
