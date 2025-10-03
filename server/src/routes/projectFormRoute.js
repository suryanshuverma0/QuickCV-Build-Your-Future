const express = require('express');
const { createProject, getProjectFormDetails , getProjectDetail , updateProjectDetail, deleteProjectDetail} = require('../controllers/projectFormController');
const auth = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/create-project-form', auth, createProject);
router.get('/get-project-form-details', auth, getProjectFormDetails);
router.get("/get-project-detail/:_id", auth, getProjectDetail);
router.put('/update-project-detail/:_id', auth, updateProjectDetail);
router.delete('/delete-project-detail/:_id', auth, deleteProjectDetail)

module.exports = router;