const ReferenceForm = require("../models/referenceFormModel");

const createReferenceForm = async (req, res) => {
  try {
    const { references } = req.body;

    if (!Array.isArray(references) || references.length === 0) {
      return res.status(400).json({ message: "No project data provided." });
    }

    const ReferenceDocs = references.map((reference) => ({
      user: req.user.id,
      name: reference.name,
      company: reference.company,
      designation: reference.designation,
      email: reference.email,
      phone: reference.phone,
    }));

    const savedReference = await ReferenceForm.insertMany(ReferenceDocs);
    res.status(201).json({ savedReference });
  } catch (error) {
    console.error("Error creating reference form:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReferenceFormDetails = async (req, res) => {
  try {
    const query = {
      user: req.user.id,
    };
    const data = await ReferenceForm.find(query).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching reference form details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReferenceData = async (req, res) => {
  try {
    const {_id} = req.params
    const data = await ReferenceForm.findById({ _id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createReferenceForm, getReferenceFormDetails, getReferenceData };