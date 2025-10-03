const AboutForm = require("../models/aboutFormModel");
const mongoose = require("mongoose");
const createAboutForm = async (req, res) => {
  try {
    const {
      name,
      designation,
      address,
      city,
      email,
      phone,
      summary,
      socialLinks,
    } = req.body;

    const loggedInUserId = req.user.id;
    console.log("Logged-in User ID:", loggedInUserId);

    const aboutFormData = await AboutForm.findOne({ user: loggedInUserId });
    console.log("Existing AboutForm Data:", aboutFormData);

    const updatedData = {
      name:name,
      designation:designation,
      address:address,
      city:city,
      email:email,
      phone:phone,
      summary: summary,
    };

    if (aboutFormData) {
      const updatedForm = await AboutForm.findOneAndUpdate(
        { user: loggedInUserId },
        { $set: updatedData },
        { new: true } 
      );

      return res.status(200).json({
        message: "User updated successfully",
        updatedForm, 
      });
    } else {
      const newAboutForm = new AboutForm({
        user: loggedInUserId,
        name,
        designation,
        address,
        city,
        email,
        phone,
        summary,
        socialLinks,
      });
      
      const savedData = await newAboutForm.save();
      
      return res.status(201).json({
        message: "AboutForm created successfully",
        savedData, 
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getAboutFormDetail = async (req, res) => {
  try {
    const query = {
      user: req.user.id,
    }
    const daata = await AboutForm.find(query);
    return res.status(200).json(daata);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: error.message });
    
  }
}

module.exports = { createAboutForm, getAboutFormDetail };
