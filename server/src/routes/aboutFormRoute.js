const express = require("express");
const { createAboutForm ,getAboutFormDetail } = require("../controllers/aboutFormController");
const auth = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/create-about-form", auth, createAboutForm);
router.get('/get-about-form-details',auth,getAboutFormDetail);
module.exports = router;