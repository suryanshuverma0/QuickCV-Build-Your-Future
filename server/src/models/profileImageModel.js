const mongoose = require("mongoose");

const profileImageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
    publicId: { type: String },                   

});

const ProfileImage = mongoose.model("ProfileImage", profileImageSchema);
module.exports = ProfileImage;
