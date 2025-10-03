// ============================================
// 1. API SERVICE (apiService.js)
// ============================================

import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  register: (formData) => api.post("/register-user", formData),
  login: (formData) => api.post("/login-user", formData),
  fetchUser: () => api.get("/fetch-user"),
};

// Resume Form APIs
export const resumeAPI = {
  // Education
  addEducation: (data) => api.post("/create-education-form", data),
  getEducation: () => api.get("/get-education-form-details"),
  getEducationDetail: (id) => api.get(`/get-education-detail/${id}`),
  updateEducation: (id, data) => api.put(`/update-education-form-details/${id}`, data),
  deleteEducation: (id) => api.delete(`/delete-education-details/${id}`),

  // Experience
  addExperience: (data) => api.post("/create-experience-form", data),
  getExperience: () => api.get("/get-experience-form-details"),
  getExperienceDetail: (id) => api.get(`/get-experience-detail/${id}`),
  updateExperience: (id, data) => api.put(`/update-experience-form-details/${id}`, data),
  deleteExperience: (id) => api.delete(`/delete-experience-form-data/${id}`),

  // Skills
  addSkills: (data) => api.post("/create-skill-form", data),
  getSkills: () => api.get("/get-skills-form-details"),
  getSkillDetail: (id) => api.get(`/get-skill-detail/${id}`),
  updateSkills: (id, data) => api.put(`/update-skill-data/${id}`, data),
  deleteSkills: (id) => api.delete(`/delete-skill-data/${id}`),

  // Projects
  addProject: (data) => api.post("/create-project-form", data),
  getProjects: () => api.get("/get-project-form-details"),
  getProjectDetail: (id) => api.get(`/get-project-detail/${id}`),
  updateProject: (id, data) => api.put(`/update-project-detail/${id}`, data),
  deleteProject: (id) => api.delete(`/delete-project-detail/${id}`),

  // Achievements
  addAchievement: (data) => api.post("/create-achievement-form", data),
  getAchievements: () => api.get("/get-achievement-form-details"),
  getAchievementDetail: (id) => api.get(`/get-achievement-detail/${id}`),
  updateAchievement: (id, data) => api.put(`/update-achievement-detail/${id}`, data),
  deleteAchievement: (id) => api.delete(`/delete-achievement-detail/${id}`),

  // References
  addReference: (data) => api.post("/create-reference-form", data),
  getReferences: () => api.get("/get-reference-form-details"),
  getReferenceDetail: (id) => api.get(`/get-reference-detail/${id}`),
  updateReference: (id, data) => api.put(`/update-reference-form/${id}`, data),
  deleteReference: (id) => api.delete(`/delete-reference-form-data/${id}`),

  // Languages
  addLanguage: (data) => api.post("/create-language-form", data),
  getLanguages: () => api.get("/get-language-form-details"),
  getLanguageDetail: (id) => api.get(`/get-language-data/${id}`),
  updateLanguage: (id, data) => api.put(`/update-language-data/${id}`, data),
  deleteLanguage: (id) => api.delete(`/delete-language-form-data/${id}`),

  // Social Media
  addSocialMedia: (data) => api.post("/create-social-media", data),
  getSocialMedia: () => api.get("/get-social-media-links"),
  updateSocialMedia: (id, data) => api.put(`/update-social-media-form-details/${id}`, data),
  deleteSocialMedia: (id) => api.delete(`/delete-social-media/${id}`),

  // About
  addAbout: (data) => api.post("/create-about-form", data),
  getAbout: () => api.get("/get-about-form-details"),
};

// Password Management APIs
export const passwordAPI = {
  forgotPassword: (email) => api.post("/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post(`/reset-password/${token}`, { password }),
};

// User Verification API
export const userVerificationAPI = {
  verifyUser: (token) => api.get(`/verify-user/${token}`),
};

// Profile Image APIs
export const profileImageAPI = {
  uploadImage: (formData) =>
    api.post("/profile-image/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getImage: () => api.get("/profile-image"),
  deleteImage: () => api.delete("/profile-image"),
};

export default api;


// ============================================
// 2. ADD REFERENCES COMPONENT (AddReferences.jsx)
// ============================================

import PropTypes from "prop-types";

const AddReferences = ({ reference, onInputChange }) => {
  const handleChange = (field, value) => {
    onInputChange(reference.id, field, value);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200 max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Reference Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={reference.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter reference name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
          />
        </div>

        {/* Company Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={reference.company || ""}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Enter company name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
          />
        </div>

        {/* Designation Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Designation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={reference.designation || ""}
            onChange={(e) => handleChange("designation", e.target.value)}
            placeholder="Enter designation"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={reference.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
          />
        </div>

        {/* Email Field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={reference.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
          />
        </div>
      </div>
    </div>
  );
};

AddReferences.propTypes = {
  reference: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    company: PropTypes.string,
    designation: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default AddReferences;


// ============================================
// 3. SHOW REFERENCES COMPONENT (ShowReferences.jsx)
// ============================================

import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";

const ShowReferences = ({ value, onEdit, setIsEditing, onDelete }) => {
  const handleEdit = () => {
    onEdit(value._id || value.id);
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this reference?")) {
      onDelete(value._id || value.id);
    }
  };

  return (
    <li className="flex justify-between items-center bg-white shadow-md p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 max-w-3xl w-full">
      <div className="flex flex-col gap-2 flex-1">
        <h1 className="text-md md:text-xl lg:text-xl font-bold text-gray-800">
          {value.name}
        </h1>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xs text-gray-500">Company:</span>
            <p className="font-medium text-sm md:text-md lg:text-md text-green-600">
              {value.company}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xs text-gray-500">Role:</span>
            <p className="font-medium text-sm md:text-md lg:text-md text-green-600">
              {value.designation}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xs text-gray-500">Email:</span>
            <p className="font-medium text-sm md:text-md lg:text-md text-gray-800">
              {value.email}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xs text-gray-500">Phone:</span>
            <p className="font-medium text-sm md:text-md lg:text-md text-gray-800">
              {value.phone}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 md:gap-4 lg:gap-4 ml-4">
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200 p-2 hover:bg-blue-50 rounded"
          aria-label="Edit reference"
        >
          <CiEdit size={24} />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 hover:bg-red-50 rounded"
          aria-label="Delete reference"
        >
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </li>
  );
};

ShowReferences.propTypes = {
  value: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ShowReferences;


// ============================================
// 4. REFERENCE FORM COMPONENT (ReferenceForm.jsx)
// ============================================

import PropTypes from "prop-types";
import FormTitle from "../components/FormTitle";
import { useState, useContext, useEffect, useCallback } from "react";
import AddReferences from "../components/AddReferences";
import { IoIosAdd } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { resumeAPI } from "../api/apiService";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import { AiOutlineDelete } from "react-icons/ai";
import ShowReferences from "../components/ShowReferences";

const ReferenceForm = ({ onItemClick }) => {
  const { logout, decodedToken } = useContext(AuthContext);
  const [references, setReferences] = useState([
    { id: null, name: "", company: "", designation: "", phone: "", email: "" },
  ]);
  const [referenceData, setReferenceData] = useState([]);
  const [referenceIdToUpdate, setReferenceIdToUpdate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all references from backend
  const fetchReferenceData = useCallback(async () => {
    try {
      const response = await resumeAPI.getReferences();
      const refs = response.data.map((ref) => ({
        id: ref._id,
        _id: ref._id,
        name: ref.name,
        company: ref.company,
        designation: ref.designation,
        phone: ref.phone,
        email: ref.email,
      }));
      setReferenceData(refs);
    } catch (error) {
      console.error("Error fetching references:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => logout(), 1000);
      } else {
        toast.error("Error fetching references");
      }
    }
  }, [logout]);

  useEffect(() => {
    if (decodedToken) {
      fetchReferenceData();
    }
  }, [decodedToken, fetchReferenceData]);

  // Add new reference
  const handleAddReference = () => {
    if (isEditing) {
      toast.warning("Please save or cancel the current edit first");
      return;
    }
    setReferences((prev) => [
      ...prev,
      { id: null, name: "", company: "", designation: "", phone: "", email: "" },
    ]);
  };

  // Input change handler
  const handleInputChange = (id, field, value) => {
    setReferences((prev) =>
      prev.map((ref, index) => {
        // For editing mode with single reference
        if (isEditing && prev.length === 1) {
          return { ...ref, [field]: value };
        }
        // For new references
        if (id === null && ref.id === null) {
          // Update the last reference with null id
          const nullIdRefs = prev.filter(r => r.id === null);
          if (nullIdRefs.length === 1 || index === prev.length - 1) {
            return { ...ref, [field]: value };
          }
        }
        // For specific id match
        if (ref.id === id) {
          return { ...ref, [field]: value };
        }
        return ref;
      })
    );
  };

  // Delete reference from backend
  const handleDeleteReferenceForm = async (id) => {
    if (window.confirm("Are you sure you want to delete this reference?")) {
      try {
        setLoading(true);
        await resumeAPI.deleteReference(id);
        toast.success("Reference deleted successfully!");
        fetchReferenceData();
      } catch (error) {
        console.error("Error deleting reference:", error);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          setTimeout(() => logout(), 1000);
        } else {
          toast.error(error.response?.data?.message || "Error deleting reference");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Get reference for editing
  const getReferenceDetail = async (id) => {
    try {
      setLoading(true);
      const response = await resumeAPI.getReferenceDetail(id);
      const data = response.data;
      setReferences([
        {
          id: data._id,
          name: data.name || "",
          company: data.company || "",
          designation: data.designation || "",
          phone: data.phone || "",
          email: data.email || "",
        },
      ]);
      setReferenceIdToUpdate(data._id);
      setIsEditing(true);
      
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching reference detail:", error);
      toast.error(error.response?.data?.message || "Error fetching reference detail");
    } finally {
      setLoading(false);
    }
  };

  // Validate reference data
  const validateReferences = (refs) => {
    for (const ref of refs) {
      if (!ref.name || !ref.name.trim()) {
        toast.error("Name is required");
        return false;
      }
      if (!ref.company || !ref.company.trim()) {
        toast.error("Company is required");
        return false;
      }
      if (!ref.designation || !ref.designation.trim()) {
        toast.error("Designation is required");
        return false;
      }
      if (!ref.phone || !ref.phone.trim()) {
        toast.error("Phone is required");
        return false;
      }
      if (!ref.email || !ref.email.trim()) {
        toast.error("Email is required");
        return false;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(ref.email.trim())) {
        return res.status(400).json({ 
          message: `Reference ${i + 1}: Please provide a valid email address.` 
        });
      }
    }

    // Create reference documents
    const referenceDocs = references.map((ref) => ({
      user: req.user.id,
      name: ref.name.trim(),
      company: ref.company.trim(),
      designation: ref.designation.trim(),
      phone: ref.phone.trim(),
      email: ref.email.trim().toLowerCase(),
    }));

    const savedReferences = await ReferenceForm.insertMany(referenceDocs);
    
    res.status(201).json({ 
      message: "References created successfully",
      savedReferences,
      count: savedReferences.length
    });
  } catch (error) {
    console.error("Error creating reference:", error);
    res.status(500).json({ 
      message: "Internal server error. Please try again later." 
    });
  }
};

// Get all references for a user
const getReferenceFormDetails = async (req, res) => {
  try {
    const references = await ReferenceForm.find({ 
      user: req.user.id 
    }).sort({ createdAt: -1 });
    
    res.status(200).json(references);
  } catch (error) {
    console.error("Error fetching references:", error);
    res.status(500).json({ 
      message: "Internal server error. Please try again later." 
    });
  }
};

// Get single reference detail
const getReferenceDetail = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!_id) {
      return res.status(400).json({ message: "Reference ID is required." });
    }

    const reference = await ReferenceForm.findOne({
      _id,
      user: req.user.id,
    });

    if (!reference) {
      return res.status(404).json({ 
        message: "Reference not found or you don't have permission to access it." 
      });
    }

    res.status(200).json(reference);
  } catch (error) {
    console.error("Error fetching reference detail:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid reference ID format." });
    }
    
    res.status(500).json({ 
      message: "Internal server error. Please try again later." 
    });
  }
};

// Update reference
const updateReferenceFormData = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, company, designation, phone, email } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Reference ID is required." });
    }

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required." });
    }
    
    if (!company || !company.trim()) {
      return res.status(400).json({ message: "Company is required." });
    }
    
    if (!designation || !designation.trim()) {
      return res.status(400).json({ message: "Designation is required." });
    }
    
    if (!phone || !phone.trim()) {
      return res.status(400).json({ message: "Phone is required." });
    }
    
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ 
        message: "Please provide a valid email address." 
      });
    }

    const updatedReference = await ReferenceForm.findOneAndUpdate(
      { _id, user: req.user.id },
      {
        $set: {
          name: name.trim(),
          company: company.trim(),
          designation: designation.trim(),
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedReference) {
      return res.status(404).json({ 
        message: "Reference not found or you don't have permission to update it." 
      });
    }

    res.status(200).json({ 
      message: "Reference updated successfully",
      updatedReference 
    });
  } catch (error) {
    console.error("Error updating reference:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid reference ID format." });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error: " + error.message 
      });
    }
    
    res.status(500).json({ 
      message: "Internal server error. Please try again later." 
    });
  }
};

// Delete reference
const deleteReferenceFormData = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!_id) {
      return res.status(400).json({ message: "Reference ID is required." });
    }

    const deletedReference = await ReferenceForm.findOneAndDelete({
      _id,
      user: req.user.id,
    });

    if (!deletedReference) {
      return res.status(404).json({ 
        message: "Reference not found or you don't have permission to delete it." 
      });
    }

    res.status(200).json({
      message: "Reference deleted successfully",
      deletedReference,
    });
  } catch (error) {
    console.error("Error deleting reference:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid reference ID format." });
    }
    
    res.status(500).json({ 
      message: "Internal server error. Please try again later." 
    });
  }
};

module.exports = {
  createReferenceForm,
  getReferenceFormDetails,
  getReferenceDetail,
  updateReferenceFormData,
  deleteReferenceFormData,
};


// ============================================
// 7. BACKEND MODEL (referenceFormModel.js)
// ============================================

const mongoose = require("mongoose");

const referenceFormSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Reference name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      maxlength: [100, "Designation cannot exceed 100 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
referenceFormSchema.index({ user: 1, createdAt: -1 });

const ReferenceForm = mongoose.model("ReferenceForm", referenceFormSchema);

module.exports = ReferenceForm;


// ============================================
// 8. BUTTON COMPONENT (Button.jsx)
// ============================================

import PropTypes from "prop-types";

const Button = ({ text, type = "button", onClick, disabled = false, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md 
        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2 transition-all duration-200 
        disabled:bg-gray-400 disabled:cursor-not-allowed 
        disabled:hover:bg-gray-400 ${className}`}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;


// ============================================
// 9. FORM TITLE COMPONENT (FormTitle.jsx)
// ============================================

import PropTypes from "prop-types";

const FormTitle = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 text-sm md:text-base">
          {description}
        </p>
      )}
    </div>
  );
};

FormTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default FormTitle;


// ============================================
// 10. AUTH CONTEXT (AuthContext.jsx) - EXAMPLE
// ============================================

import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setDecodedToken(decoded);
          setUser(decoded);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setDecodedToken(decoded);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setDecodedToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        decodedToken,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


// ============================================
// 11. MAIN APP SETUP (app.js) - BACKEND
// ============================================

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Import routes
const referenceRoutes = require("./routes/referenceFormRoutes");
// ... other routes

// Use routes
app.use("/api", referenceRoutes);
// ... other routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Something went wrong!", 
    error: process.env.NODE_ENV === "development" ? err.message : undefined 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;


// ============================================
// 12. AUTH MIDDLEWARE (authMiddlewares.js)
// ============================================

const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ 
        message: "No authentication token, access denied" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = auth;


// ============================================
// INSTALLATION INSTRUCTIONS
// ============================================

/*

FRONTEND DEPENDENCIES:
npm install axios react-toastify react-icons prop-types jwt-decode

BACKEND DEPENDENCIES:
npm install express mongoose cors dotenv jsonwebtoken bcryptjs

ENVIRONMENT VARIABLES (.env):
MONGODB_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3000
NODE_ENV=development

FOLDER STRUCTURE:

frontend/
├── src/
│   ├── api/
│   │   └── apiService.js
│   ├── components/
│   │   ├── AddReferences.jsx
│   │   ├── ShowReferences.jsx
│   │   ├── Button.jsx
│   │   └── FormTitle.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   └── ReferenceForm.jsx
│   └── App.jsx

backend/
├── controllers/
│   └── referenceFormController.js
├── middlewares/
│   └── authMiddlewares.js
├── models/
│   └── referenceFormModel.js
├── routes/
│   └── referenceFormRoutes.js
├── app.js
├── .env
└── package.json

USAGE:
1. Install all dependencies
2. Set up environment variables
3. Start MongoDB
4. Run backend: npm start or nodemon app.js
5. Run frontend: npm run dev (Vite) or npm start (CRA)
6. Access the application

TESTING CHECKLIST:
✅ Create single reference
✅ Create multiple references
✅ View all references
✅ Edit reference
✅ Delete reference
✅ Form validation
✅ Email validation
✅ Cancel edit mode
✅ Session expiry handling
✅ Error handling
✅ Loading states
✅ Responsive design

*/" /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(ref.email.trim())) {
        toast.error("Please enter a valid email address");
        return false;
      }
    }
    return true;
  };

  // Update reference
  const updateReferenceData = async () => {
    const ref = references[0];

    if (!validateReferences([ref])) {
      return;
    }

    try {
      setLoading(true);
      const updateData = {
        name: ref.name.trim(),
        company: ref.company.trim(),
        designation: ref.designation.trim(),
        phone: ref.phone.trim(),
        email: ref.email.trim(),
      };

      await resumeAPI.updateReference(referenceIdToUpdate, updateData);
      toast.success("Reference updated successfully!");
      
      // Reset form
      setIsEditing(false);
      setReferenceIdToUpdate(null);
      setReferences([
        { id: null, name: "", company: "", designation: "", phone: "", email: "" },
      ]);
      
      fetchReferenceData();
    } catch (error) {
      console.error("Error updating reference:", error);
      toast.error(error.response?.data?.message || "Error updating reference");
    } finally {
      setLoading(false);
    }
  };

  // Save new reference(s)
  const handleSave = async () => {
    if (!validateReferences(references)) {
      return;
    }

    try {
      setLoading(true);
      const referencesToSave = references.map((ref) => ({
        name: ref.name.trim(),
        company: ref.company.trim(),
        designation: ref.designation.trim(),
        phone: ref.phone.trim(),
        email: ref.email.trim(),
      }));

      await resumeAPI.addReference({ references: referencesToSave });
      toast.success(
        `${referencesToSave.length} reference${referencesToSave.length > 1 ? "s" : ""} saved successfully!`
      );
      
      // Reset form
      setReferences([
        { id: null, name: "", company: "", designation: "", phone: "", email: "" },
      ]);
      
      fetchReferenceData();
    } catch (error) {
      console.error("Error saving reference:", error);
      toast.error(error.response?.data?.message || "Error saving reference");
    } finally {
      setLoading(false);
    }
  };

  // Delete from local state
  const handleDeleteReference = (id) => {
    if (references.length === 1) {
      // Don't delete if it's the last one, just reset it
      setReferences([
        { id: null, name: "", company: "", designation: "", phone: "", email: "" },
      ]);
    } else {
      setReferences((prev) => prev.filter((ref) => ref.id !== id));
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setReferenceIdToUpdate(null);
    setReferences([
      { id: null, name: "", company: "", designation: "", phone: "", email: "" },
    ]);
  };

  return (
    <>
      <div className="h-[1000px] overflow-y-auto">
        <div className="pl-4 pr-4">
          <FormTitle
            title="References"
            description="Add references including name, company, and contact details."
          />
        </div>

        {/* Editing Mode Banner */}
        {isEditing && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mx-4">
            <div className="flex justify-between items-center">
              <p className="text-blue-700 font-medium">
                📝 Editing Mode: Update the reference below
              </p>
              <button
                onClick={handleCancelEdit}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                disabled={loading}
              >
                ✕ Cancel Edit
              </button>
            </div>
          </div>
        )}

        {/* Display saved references */}
        {referenceData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 px-4">
              Saved References ({referenceData.length})
            </h3>
            <ul className="flex flex-col gap-3 items-center">
              {referenceData.map((data) => (
                <ShowReferences
                  key={data.id}
                  value={data}
                  onEdit={getReferenceDetail}
                  setIsEditing={setIsEditing}
                  onDelete={handleDeleteReferenceForm}
                />
              ))}
            </ul>
          </div>
        )}

        {/* Form for adding/editing references */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 px-4">
            {isEditing ? "Edit Reference" : "Add New Reference(s)"}
          </h3>
          {references.map((ref, index) => (
            <div key={ref.id || `ref-${index}`} className="relative">
              <AddReferences reference={ref} onInputChange={handleInputChange} />
              {!isEditing && references.length > 1 && (
                <button
                  onClick={() => handleDeleteReference(ref.id)}
                  className="absolute top-8 right-8 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors"
                  aria-label="Remove this reference form"
                  title="Remove this reference"
                >
                  <AiOutlineDelete size={24} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Reference Button */}
        {!isEditing && (
          <div
            onClick={handleAddReference}
            className="mt-6 mx-4 flex items-center text-lg gap-2 text-blue-500 font-semibold cursor-pointer hover:text-blue-700 hover:underline transition-colors"
          >
            <IoIosAdd size={28} />
            <p>Add Another Reference</p>
          </div>
        )}

        {/* Save/Update Button */}
        <div className="m-8 flex justify-end">
          <Button
            text={
              loading
                ? "Processing..."
                : isEditing
                ? "Update Reference"
                : "Save Reference(s)"
            }
            type="button"
            onClick={isEditing ? updateReferenceData : handleSave}
            disabled={loading}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 my-4">
          <button
            className="bg-white hover:bg-neutral-800 hover:text-white transition-colors duration-200 border-black border-2 text-black text-sm py-2 px-6 rounded font-medium"
            onClick={() => onItemClick("language")}
            disabled={loading}
          >
            ← Back
          </button>
          <button
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-6 rounded transition-colors duration-200 font-medium"
            onClick={() => onItemClick("share")}
            disabled={loading}
          >
            Continue to Share CV →
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

ReferenceForm.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default ReferenceForm;


// ============================================
// 5. BACKEND ROUTE (referenceFormRoutes.js)
// ============================================

const express = require("express");
const auth = require("../middlewares/authMiddlewares");
const {
  createReferenceForm,
  getReferenceFormDetails,
  getReferenceDetail,
  updateReferenceFormData,
  deleteReferenceFormData,
} = require("../controllers/referenceFormController");

const router = express.Router();

router.post("/create-reference-form", auth, createReferenceForm);
router.get("/get-reference-form-details", auth, getReferenceFormDetails);
router.get("/get-reference-detail/:_id", auth, getReferenceDetail);
router.put("/update-reference-form/:_id", auth, updateReferenceFormData);
router.delete("/delete-reference-form-data/:_id", auth, deleteReferenceFormData);

module.exports = router;


// ============================================
// 6. BACKEND CONTROLLER (referenceFormController.js)
// ============================================

const ReferenceForm = require("../models/referenceFormModel");

// Create multiple references
const createReferenceForm = async (req, res) => {
  try {
    const { references } = req.body;

    // Validation
    if (!Array.isArray(references) || references.length === 0) {
      return res.status(400).json({ 
        message: "No reference data provided. Please add at least one reference." 
      });
    }

    // Validate each reference
    for (let i = 0; i < references.length; i++) {
      const ref = references[i];
      
      if (!ref.name || !ref.name.trim()) {
        return res.status(400).json({ 
          message: `Reference ${i + 1}: Name is required.` 
        });
      }
      
      if (!ref.company || !ref.company.trim()) {
        return res.status(400).json({ 
          message: `Reference ${i + 1}: Company is required.` 
        });
      }
      
      if (!ref.designation || !ref.designation.trim()) {
        return res.status(400).json({ 
          message: `Reference ${i + 1}: Designation is required.` 
        });
      }
      
      if (!ref.phone || !ref.phone.trim()) {
        return res.status(400).json({ 
          message: `Reference ${i + 1}: Phone is required.` 
        });
      }
      
      if (!ref.email || !ref.email.trim()) {
        return res.status(400).json({ 
          message: `Reference ${i + 1}: Email is required.` 
        });
      }

      // Email validation
      const emailRegex =