const express = require("express");
const { createReferenceForm ,getReferenceFormDetails, getReferenceData } = require("../controllers/referenceFormController");
const auth = require("../middlewares/authMiddlewares");
const router = express.Router();
router.post("/create-reference-form", auth, createReferenceForm);
router.get("/get-reference-form-details", auth, getReferenceFormDetails);
router.get("/get-reference-data/:_id", auth , getReferenceData)


module.exports = router;