const express = require('express');
const {protect} = require('../middleware/authmiddleware');
const { addtask, gettask, updatetask, deletetask } = require('../controller/taskController');
const taskRouter = express.Router();

taskRouter.post('/add', protect, addtask);
taskRouter.get('/get/:projectId', protect, gettask);
taskRouter.put('/update/:id', protect, updatetask);
taskRouter.delete('/delete/:id', protect, deletetask);

module.exports = taskRouter;