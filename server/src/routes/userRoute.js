const express = require("express");
const {
  registerUser,
  loginUser,
  fetchUserDetails,
  forgotPassword,
  resetPassword,
  verifyUser
} = require("../controllers/userController");
const auth = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/fetch-user", auth, fetchUserDetails);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/verify-user/:token", verifyUser);

module.exports = router;
