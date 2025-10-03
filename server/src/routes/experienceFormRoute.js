const express = require('express');
const { createExperienceForm , getExperienceFormDetails, getExperienceDetail, updateExperienceFormData, deleteExperienceFormData } = require('../controllers/experienceFormController');
const auth = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/create-experience-form', auth, createExperienceForm);
router.get('/get-experience-form-details', auth, getExperienceFormDetails);
router.get('/get-experience-detail/:_id', auth, getExperienceDetail);
router.put('/update-experience-form/:_id', auth, updateExperienceFormData);
router.delete('/delete-experience-form-data/:_id', auth, deleteExperienceFormData);

module.exports = router;