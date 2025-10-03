const SocialLinks = require("../models/socialMediaLinksModel");

const createSocialMedia = async (req, res) => {
  try {
    const { addSocialMedia } = req.body;
    console.log(addSocialMedia)
    if (!Array.isArray(addSocialMedia) || addSocialMedia.length === 0) {
      return res
        .status(400)
        .json({ message: "No social media data found data provided." });
    }

    const addSocialMediaDocs = addSocialMedia.map((socialMedia) => ({
      user: req.user.id,
      linkType: socialMedia.linkType,
      link: socialMedia.link,
    }));

    const savedData = await SocialLinks.insertMany(addSocialMediaDocs);
    res.status(201).json(savedData);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSocialMediaLinks = async (req, res) => {
  try {
    const socialMediaLinks = await SocialLinks.find({ user: req.user.id });
    return res.status(200).json(socialMediaLinks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteSocialMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const socialMedia = await SocialLinks.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!socialMedia) {
      return res.status(404).json({ message: "Social media link not found" });
    }

    return res.status(200).json({ message: "Social media link deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { createSocialMedia, getSocialMediaLinks, deleteSocialMedia };
