const express = require("express");
const { createEducationForm , getEducationFormDetails, updateEducationFormDetails , getOneEducationDetails, deleteEducationDetails } = require("../controllers/educationController");
const auth = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/create-education-form", auth, createEducationForm);
router.get("/get-education-form-details", auth, getEducationFormDetails);
router.put("/update-education-form-details/:_id", auth, updateEducationFormDetails);
router.get("/get-education-detail/:_id", auth, getOneEducationDetails);
router.delete("/delete-education-details/:_id", auth, deleteEducationDetails)

module.exports = router;
