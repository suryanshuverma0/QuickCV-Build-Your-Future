const EducationForm = require("../models/educationFormModle");

const createEducationForm = async (req, res) => {
  try {
    const { educations } = req.body;

    if (!Array.isArray(educations) || educations.length === 0) {
      return res.status(400).json({ message: "No education data provided." });
    }

    const educationDocs = educations.map((edu) => ({
      user: req.user.id,
      school: edu.school,
      degree: edu.degree,
      city: edu.city,
      startDate: edu.startDate,
      endDate: edu.endDate,
      currentlyStudying: edu.currentlyStudying,
    }));

    const savedEducations = await EducationForm.insertMany(educationDocs);

    res.status(201).json({ savedEducations });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error." });
  }
};

const getEducationFormDetails = async (req, res) => {
  try {
    const query = {
      user: req.user.id,
    };
    const data = await EducationForm.find(query).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateEducationFormDetails = async (req, res) => {
  try {
    const { _id } = req.params;

    console.log(_id);
    const { school, degree, city, startDate, endDate, currentlyStudying } =
      req.body;

    const updatedData = {
      school: school,
      degree: degree,
      city: city,
      startDate: startDate,
      endDate: endDate,
      currentlyStudying: currentlyStudying,
    };

    const updatedEducation = await EducationForm.findOneAndUpdate(
      { _id },
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json({ updatedEducation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteEducationDetails = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await EducationForm.findByIdAndDelete(_id);
    console.log("data", data);

    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting data" });
  }
};

const getOneEducationDetails = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await EducationForm.findById(_id);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEducationForm,
  getEducationFormDetails,
  updateEducationFormDetails,
  getOneEducationDetails,
  deleteEducationDetails,
};
