const express = require('express');
const { register, login, logout, checkauth, editusername, deleteaccount, updatepassword } = require('../controller/userController');
const {protect} = require('../middleware/authmiddleware');
const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.put('/editname', protect, editusername);
userRouter.put('/updatepassword', protect, updatepassword);
userRouter.post('/logout', logout);
userRouter.delete('/deleteaccount', protect, deleteaccount);
userRouter.get('/check', protect, checkauth);

module.exports = userRouter;