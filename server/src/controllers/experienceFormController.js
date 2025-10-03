const ExperienceForm = require("../models/experienceFormModel");

const createExperienceForm = async (req, res) => {
  try {
    const { experiences } = req.body;

    if (!Array.isArray(experiences) || experiences.length === 0) {
      return res.status(400).json({ message: "No experience data provided." });
    }

    const experienceDocs = experiences.map((exp) => ({
      user: req.user.id,
      jobTitle: exp.jobTitle,
      organization: exp.organization,
      city: exp.city,
      startDate: exp.startDate,
      endDate: exp.endDate,
      currentlyWorking: exp.currentlyWorking,
      summary: exp.summary,
    }));

    const savedExperiences = await ExperienceForm.insertMany(experienceDocs);

    res.status(201).json({ savedExperiences });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error." });
  }
};

const getExperienceFormDetails = async (req, res) => {
  try {
    const query = {
      user: req.user.id,
    };
    const data = await ExperienceForm.find(query).sort({ createdAt: -1 });
    res.status(200).json(data);
    console.log("I am data of experience which is fetched from backend ", data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getExperienceDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await ExperienceForm.findById(_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExperienceFormData = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      jobTitle,
      organization,
      city,
      startDate,
      endDate,
      currentlyWorking,
      summary,
    } = req.body;

    const updatedData = {
      jobTitle: jobTitle,
      organization: organization,
      city: city,
      startDate: startDate,
      endDate: endDate,
      currentlyWorking: currentlyWorking,
      summary: summary,
    };

    const updatedExperience = await ExperienceForm.findOneAndUpdate(
      { _id },
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json({ updatedExperience });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExperienceFormData = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedExperience = await ExperienceForm.findOneAndDelete({ _id });
    res.status(200).json({ deletedExperience });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExperienceForm,
  getExperienceFormDetails,
  getExperienceDetail,
  updateExperienceFormData,
  deleteExperienceFormData,
};
