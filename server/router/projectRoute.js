const express = require('express');
const { protect } = require('../middleware/authmiddleware');
const { createproject, getprojects, getpublicprojects, updateproject, deleteproject } = require('../controller/projectController');
const projectRouter = express.Router();

projectRouter.post('/create', protect, createproject);
projectRouter.get('/', protect, getprojects);
projectRouter.get('/getpublic', getpublicprojects);
projectRouter.put('/update/:id', protect, updateproject);
projectRouter.delete('/delete/:id', protect, deleteproject);

module.exports = projectRouter;