const express = require("express");
const {
  createAchievementForm,
  getAchievementFormDetails,
  getAchievementDetail,
  updateAchievementDetail,
  deleteAchievementDetail
} = require("../controllers/achievementFormController");
const auth = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/create-achievement-form", auth, createAchievementForm);
router.get("/get-achievement-form-details", auth, getAchievementFormDetails);
router.get("/get-achievement-detail/:_id", auth, getAchievementDetail);
router.put("/update-achievement-detail/:_id", auth, updateAchievementDetail);
router.delete("/delete-achievement-detail/:_id", auth, deleteAchievementDetail);

module.exports = router;
