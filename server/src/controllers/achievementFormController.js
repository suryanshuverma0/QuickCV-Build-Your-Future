const AchievementForm = require("../models/achievementFormModel");

// const createAchievementForm = async (req, res) => {
//   try {
//     const { achievements } = req.body;
//     if (!Array.isArray(achievements) || achievements.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "No achievements data provided." });
//     }

//     const achievementsDocs = achievements.map((achievement) => ({
//       user: req.user.id,
//       title: achievement.title,
//       summary: achievement.summary,
//       link: achievement.link,
//     }));

//     const savedAchievements = await AchievementForm.insertMany(
//       achievementsDocs
//     );
//     res.status(201).json({ savedAchievements });
//   } catch (err) {
//     console.error(error);
//     if (error.name === "ValidationError") {
//       return res.status(400).json({ message: error.message });
//     }
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

const createAchievementForm = async (req, res) => {
  try {
    const { achievements } = req.body;
    if (!Array.isArray(achievements) || achievements.length === 0) {
      return res.status(400).json({ message: "No achievements data provided." });
    }

    const achievementsDocs = achievements.map((achievement) => ({
      user: req.user.id,
      title: achievement.title,
      summary: achievement.summary,
      link: achievement.link,
    }));

    const savedAchievements = await AchievementForm.insertMany(achievementsDocs);
    res.status(201).json({ savedAchievements });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAchievementFormDetails = async (req, res) => {
  try {
    const query = {
      user: req.user.id,
    };

    const data = await AchievementForm.find(query).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getAchievementDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    const achievement = await AchievementForm.findById(_id);
    res.status(200).json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAchievementDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, summary, link } = req.body;
    const updatedData = {
      title: title,
      summary: summary,
      link: link,
    };

    const updatedAchievement = await AchievementForm.findOneAndUpdate(
      { _id },
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json(updatedAchievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAchievementDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteAchievement = await AchievementForm.findOneAndDelete({ _id });
    res.status(200).json({ deleteAchievement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createAchievementForm,
  getAchievementFormDetails,
  getAchievementDetail,
  updateAchievementDetail,
  deleteAchievementDetail
};
