const mongoose = require("mongoose");

const languageFormSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});

const LanguageForm = mongoose.model("LanguageForm", languageFormSchema);
module.exports = LanguageForm;
