const mongoose = require("mongoose");

const skillsFormSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

const SkillsForm = mongoose.model("SkillsForm", skillsFormSchema);
module.exports = SkillsForm;
