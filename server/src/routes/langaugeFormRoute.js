const express = require("express");
const router = express.Router();
const {
  createLanguageForm,
  getLanguageFormDetails,
  getLanguageData,
  updateLanguageData,
  deleteLanguageData,
} = require("../controllers/languageFormController");
const auth = require("../middlewares/authMiddlewares");

router.post("/create-language-form", auth, createLanguageForm);
router.get("/get-language-form-details", auth, getLanguageFormDetails);
router.get("/get-language-data/:_id", auth, getLanguageData);
router.put("/update-language-data/:_id", auth, updateLanguageData);
router.delete("/delete-language-form-data/:_id", auth, deleteLanguageData)

module.exports = router;
