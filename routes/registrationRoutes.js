const express = require("express");
const router = express.Router();
const controller = require("../controllers/registrationController");

router.get("/", controller.showForm);
router.post("/register", controller.submitRegistration);

module.exports = router;
