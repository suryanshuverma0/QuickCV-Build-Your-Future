const mongoose = require("mongoose");
const User = require("../models/userModel");

// Get full resume of a specific user
const getResume = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("lets check userId", userId);

    const resume = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },

      // About
      {
        $lookup: {
          from: "aboutforms",
          localField: "_id",
          foreignField: "user",
          as: "about",
        },
      },

      // Achievements
      {
        $lookup: {
          from: "achievementforms",
          localField: "_id",
          foreignField: "user",
          as: "achievements",
        },
      },

      // Education
      {
        $lookup: {
          from: "educationforms",
          localField: "_id",
          foreignField: "user",
          as: "education",
        },
      },

      // Experience
      {
        $lookup: {
          from: "experienceforms",
          localField: "_id",
          foreignField: "user",
          as: "experience",
        },
      },

      // Languages
      {
        $lookup: {
          from: "languageforms",
          localField: "_id",
          foreignField: "user",
          as: "languages",
        },
      },

      // Projects
      {
        $lookup: {
          from: "projectforms",
          localField: "_id",
          foreignField: "user",
          as: "projects",
        },
      },

      // References
      {
        $lookup: {
          from: "referenceforms",
          localField: "_id",
          foreignField: "user",
          as: "references",
        },
      },

      // Skills
      {
        $lookup: {
          from: "skillsforms",
          localField: "_id",
          foreignField: "user",
          as: "skills",
        },
      },

      // Social Media
      {
        $lookup: {
          from: "socialmedialinks",
          localField: "_id",
          foreignField: "user",
          as: "socialMedia",
        },
      },

      // Profile Image
      {
        $lookup: {
          from: "profileimages",
          localField: "_id",
          foreignField: "user",
          as: "profileImage",
          pipeline: [{ $sort: { uploadedAt: -1 } }, { $limit: 1 }],
        },
      },

      // Remove sensitive fields
      {
        $project: {
          password: 0,
          __v: 0,
        },
      },
    ]);

    if (!resume || resume.length === 0) {
      return res.status(404).json({ message: "Resume not found" });
    }

    console.log("lets check data", resume[0]);
    res.json(resume[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getResume };
