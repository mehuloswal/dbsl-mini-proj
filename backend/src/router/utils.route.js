const express = require("express");
const {
  VaccinateUserController,
  GetUsersToVaccinateController,
  getAllSlotsController,
  RegisterUserVaccineSlotController,
  NurseLoginController,
  UserLoginController,
  GetUserProfileController,
  GetNurseProfileController,
  GetVccineCentersController,
} = require("../controller/utils.controller.js");
const nurseAuth = require("../middleware/nurse.auth.js");
const userAuth = require("../middleware/user.auth.js");
const router = new express.Router();

router.patch("/vaccinate", nurseAuth, VaccinateUserController);
router.post("/users", nurseAuth, GetUsersToVaccinateController);
router.get("/slots", getAllSlotsController);
router.patch("/register", userAuth, RegisterUserVaccineSlotController);
router.post("/nurse-login", NurseLoginController);
router.post("/user-login", UserLoginController);
router.get("/user-profile", userAuth, GetUserProfileController);
router.get("/nurse-profile", nurseAuth, GetNurseProfileController);
router.get("/vaccine-centers", GetVccineCentersController);
module.exports = { utilsRouter: router };
