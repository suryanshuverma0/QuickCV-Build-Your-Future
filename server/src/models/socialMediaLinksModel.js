const mongoose = require("mongoose");

const socialMediaLinksSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     linkType: {
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
  },
  { timestamps: true }
);

const SocialMediaLinks = mongoose.model("SocialMediaLinks", socialMediaLinksSchema);
module.exports = SocialMediaLinks;
