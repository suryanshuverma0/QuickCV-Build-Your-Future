const express = require("express");
const {createSocialMedia, getSocialMediaLinks , deleteSocialMedia } = require("../controllers/socialMediaController");

const auth = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/create-social-media", auth, createSocialMedia);
router.get("/get-social-media-links", auth, getSocialMediaLinks);
router.delete("/delete-social-media/:id", auth, deleteSocialMedia); 

module.exports = router;