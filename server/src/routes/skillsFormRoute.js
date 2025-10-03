const express = require('express');
const router = express.Router();
const { createSkills, getSkills, getSkill, updateSkill, deleteSkill } = require('../controllers/skillsFormController');
const auth = require('../middlewares/authMiddlewares');

router.post('/create-skill-form', auth, createSkills);
router.get('/get-skills-form-details', auth, getSkills);
router.get('/get-skill-detail/:_id' , auth, getSkill);
router.put('/update-skill-data/:_id', auth, updateSkill)
router.delete('/delete-skill-data/:_id', auth , deleteSkill)

module.exports = router;