const express = require("express");
const {
  createSlotController,
  createUserController,
  createVaccineCenterController,
  createVaccineController,
  createNurseController,
} = require("../controller/create.controller.");
const router = new express.Router();

router.post("/nurse", createNurseController);
router.post("/slot", createSlotController);
router.post("/vaccine-center", createVaccineCenterController);
router.post("/vaccine", createVaccineController);
router.post("/user", createUserController);

module.exports = { createRouter: router };
