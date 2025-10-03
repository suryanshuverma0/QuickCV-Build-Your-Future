const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/authMiddlewares");
const {
  uploadProfileImage,
  getProfileImage,
  deleteProfileImage,
} = require("../controllers/profileImageController");

// memory storage -> buffer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
});

router.post("/upload", auth, upload.single("image"), uploadProfileImage);
router.get("/", auth, getProfileImage);
router.delete("/", auth, deleteProfileImage);

module.exports = router;
