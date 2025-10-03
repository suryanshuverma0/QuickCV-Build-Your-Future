const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  link: {
    type: String,
  },
});

const AchievementForm = mongoose.model("AchievementForm", achievementSchema);
module.exports = AchievementForm;
