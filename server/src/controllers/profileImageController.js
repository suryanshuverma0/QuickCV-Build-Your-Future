// server/src/controllers/profileImageController.js
const ProfileImage = require("../models/profileImageModel");
const cloudinary = require("../config/cloudinaryConfig"); // the file you created
const streamifier = require("streamifier");

const uploadFromBuffer = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "profile_images" }, // optional folder in your Cloudinary account
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // upload to Cloudinary
    const result = await uploadFromBuffer(req.file.buffer);

    // find existing DB entry
    let profileImage = await ProfileImage.findOne({ user: req.user.id });

    if (profileImage) {
      // delete previous cloud image (if stored)
      if (profileImage.publicId) {
        try {
          await cloudinary.uploader.destroy(profileImage.publicId);
        } catch (delErr) {
          console.warn("Failed to delete old Cloudinary image:", delErr);
        }
      }
      // update
      profileImage.imageUrl = result.secure_url;
      profileImage.publicId = result.public_id;
      profileImage.uploadedAt = Date.now();
      await profileImage.save();
    } else {
      profileImage = new ProfileImage({
        user: req.user.id,
        imageUrl: result.secure_url,
        publicId: result.public_id,
      });
      await profileImage.save();
    }

    return res.status(200).json({
      message: "Profile image uploaded successfully",
      imageUrl: profileImage.imageUrl,
    });
  } catch (error) {
    console.error("Profile image upload error:", error);
    return res.status(500).json({ message: "Error uploading profile image" });
  }
};

const getProfileImage = async (req, res) => {
  try {
    const profileImage = await ProfileImage.findOne({ user: req.user.id });
    if (!profileImage) return res.status(404).json({ message: "No profile image found" });
    return res.status(200).json(profileImage);
  } catch (error) {
    console.error("Get profile image error:", error);
    return res.status(500).json({ message: "Error retrieving profile image" });
  }
};

const deleteProfileImage = async (req, res) => {
  try {
    const profileImage = await ProfileImage.findOne({ user: req.user.id });
    if (!profileImage) return res.status(404).json({ message: "No profile image found" });

    if (profileImage.publicId) {
      try {
        await cloudinary.uploader.destroy(profileImage.publicId);
      } catch (err) {
        console.warn("Cloudinary delete failed:", err);
      }
    }
    await ProfileImage.deleteOne({ _id: profileImage._id });
    return res.status(200).json({ message: "Profile image deleted successfully" });
  } catch (error) {
    console.error("Delete profile image error:", error);
    return res.status(500).json({ message: "Error deleting profile image" });
  }
};

module.exports = { uploadProfileImage, getProfileImage, deleteProfileImage };
