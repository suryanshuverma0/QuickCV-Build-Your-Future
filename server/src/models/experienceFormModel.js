const mongoose = require("mongoose");

const experienceFormSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },

    organization: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: function () {
        return !this.currentlyWorking;
      },
      validate: {
        validator: function (value) {
          if (this.currentlyWorking) {
            return !value; // Disallow endDate if currentlyStudying is true
          }
          // Ensure endDate is after startDate
          const start = new Date(this.startDate);
          const end = new Date(value);
          return end > start;
        },
        message:
          "End date must be greater than start date, and not allowed if you are currently studying.",
      },
    },

    currentlyWorking: {
      type: Boolean,
      required: true,
    },
    summary: {
      type: String,
    },
  },
  { timestamps: true }
);

const ExperienceForm = mongoose.model("ExperienceForm", experienceFormSchema);
module.exports = ExperienceForm;
