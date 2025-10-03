const mongoose = require("mongoose");

const projectFormSchema = new mongoose.Schema({
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
    required: true,
  },
  link: {
    type: String,
    required: true,
    match: [
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(\/[^\s]*)?$/,
      "Please provide a valid URL.",
    ],
  },
});


const ProjectForm = mongoose.model("ProjectForm", projectFormSchema);
module.exports = ProjectForm;