const SkillsForm = require("../models/skillsFormModel");
const createSkills = async (req, res) => {
  try {
    console.log("I am skill ", req.body)
    const { skills } = req.body;
    console.log("I am skills data after req.body")
    
    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ message: "No skills data provided." });
    }

    const skillDocs = skills.map((skill) => ({
      user: req.user.id,
      skill: skill.skill,
      level: skill.level,
    }));

    const savedSkills = await SkillsForm.insertMany(skillDocs);
    res.status(201).json({ savedSkills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getSkills = async (req, res) => {
  try {
    const query = {
      user: req.user.id,
    };
    const skills = await SkillsForm.find(query).sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getSkill = async (req, res) => {
  try {
    const { _id } = req.params;
    const skillData = await SkillsForm.findById(_id);
    res.status(200).json(skillData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateSkill = async (req, res) => {
  try {
    const { _id } = req.params;
    const { skill , level} = req.body;

    const updatedData = {
      skill: skill,
      level: level

    }
    
    const skillData = await SkillsForm.findByIdAndUpdate(
      {_id},
      { $set : updatedData },
      { new: true }
    )

    res.status(200).json({ skillData });

  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}

const deleteSkill = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteSkill = await SkillsForm.findOneAndDelete({_id});
    res.status(200).json({ deleteSkill });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
module.exports = { createSkills, getSkills, getSkill , updateSkill , deleteSkill};
