import axios from "axios";

const BASE_URL = "https://quickcv-build-your-future.onrender.com/api";

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
  updateEducation: (id, data) =>
    api.put(`/update-education-form-details/${id}`, data),
  deleteEducation: (id) => api.delete(`/delete-education-details/${id}`),

  // Experience
  addExperience: (data) => api.post("/create-experience-form", data),
  getExperience: () => api.get("/get-experience-form-details"),
  getExperienceDetail: (id) => api.get(`/get-experience-detail/${id}`),
  updateExperience: (id, data) =>
    api.put(`/update-experience-form-details/${id}`, data),
  deleteExperience: (id) => api.delete(`/delete-experience-form-data/${id}`),

  // Skills
  addSkills: (data) => api.post("/create-skill-form", data),
  getSkills: () => api.get("/get-skills-form-details"),
  getSkillDetail: (id) => api.get(`/get-skill-detail/${id}`),
  updateSkills: (id, data) =>
    api.put(`/update-skill-data/${id}`, data),
  deleteSkills: (id) => api.delete(`/delete-skill-data/${id}`),

  // Projects
  addProject: (data) => api.post("/create-project-form", data),
  getProjects: () => api.get("/get-project-form-details"),
  getProjectDetail: (id) => api.get(`/get-project-detail/${id}`),
  updateProject: (id, data) =>
    api.put(`/update-project-detail/${id}`, data),
  deleteProject: (id) => api.delete(`/delete-project-detail/${id}`),

  // Achievements
  addAchievement: (data) => api.post("/create-achievement-form", data),
  getAchievements: () => api.get("/get-achievement-form-details"),
  getAchievementDetail: (id) => api.get(`/get-achievement-detail/${id}`),
  updateAchievement: (id, data) =>
    api.put(`/update-achievement-detail/${id}`, data),
  deleteAchievement: (id) => api.delete(`/delete-achievement-detail/${id}`),

  // References
  addReference: (data) => api.post("/create-reference-form", data),
  getReferences: () => api.get("/get-reference-form-details"),
  getReferenceDetail: (id) => api.get(`/get-reference-detail/${id}`),
  updateReference: (id, data) =>
    api.put(`/update-reference-form-details/${id}`, data),
  deleteReference: (id) => api.delete(`/delete-reference-details/${id}`),

  // Languages
  addLanguage: (data) => api.post("/create-language-form", data),
  getLanguages: () => api.get("/get-language-form-details"),
  getLanguageDetail: (id) => api.get(`/get-language-data/${id}`),
  updateLanguage: (id, data) =>
    api.put(`/update-language-data/${id}`, data),
  deleteLanguage: (id) => api.delete(`/delete-language-form-data/${id}`),

  // Social Media
  addSocialMedia: (data) => api.post("/create-social-media", data),
  getSocialMedia: () => api.get("/get-social-media-links"),
  updateSocialMedia: (id, data) =>
    api.put(`/update-social-media-form-details/${id}`, data),
  deleteSocialMedia: (id) => api.delete(`/delete-social-media/${id}`),

  // About
  addAbout: (data) => api.post("/create-about-form", data),
  getAbout: () => api.get("/get-about-form-details"),

    getMe: () => api.get("/me"),


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
