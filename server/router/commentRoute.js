const express = require('express');
const { addcomment, getcomment } = require('../controller/commentController');
const {protect} = require('../middleware/authmiddleware');
const commentRouter = express.Router();

commentRouter.post('/add', protect, addcomment);
commentRouter.get('/get/:projectId', protect, getcomment);

module.exports = commentRouter;