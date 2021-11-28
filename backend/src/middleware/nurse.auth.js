const jwt = require("jsonwebtoken");
const Nurse = require("../models/nurse");
const nurseAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "LOLZ");
    const nurse = await Nurse.findOne({
      _id: decoded._id,
    });
    if (!nurse) {
      throw new Error();
    }
    req.token = token;
    req.nurse = nurse;
    next();
  } catch (e) {
    res.status(401).send("Please Authenticate");
  }
};

module.exports = nurseAuth;
