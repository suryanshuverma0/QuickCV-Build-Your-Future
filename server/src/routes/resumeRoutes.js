const express = require("express");
const { getResume } = require("../controllers/resumeController");
const auth = require('../middlewares/authMiddlewares');


const router = express.Router();

router.get("/me", auth, getResume);

module.exports = router;
