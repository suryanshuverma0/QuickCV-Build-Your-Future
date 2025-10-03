const mongoose = require("mongoose");

const educationFormSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    school: {
      type: String,
      required: true,
    },

    degree: {
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
        return !this.currentlyStudying;
      },
      validate: {
        validator: function (value) {
          if (this.currentlyStudying) {
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

    currentlyStudying: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const EducationForm = mongoose.model("EducationForm", educationFormSchema);
module.exports = EducationForm;
