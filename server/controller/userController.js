const generateToken = require('../config/generateToken');
const { User } = require('../model/userSchema');
const { Task } = require('../model/taskSchema');
const { Project } = require('../model/projectSchema');
const { Comment } = require('../model/commentSchema');
const bcrypt = require('bcryptjs');

const register = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        const userExist = await User.findOne({email});
        if(userExist) return res.status(400).json({message:'user already exist'});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashPassword
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: 'Registration successful'
        });
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: 'user not found, please register'});
        }
        if(user && (await bcrypt.compare(password, user.password))) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                message: 'Login successful'
            })
        } else {
            res.status(401).json({message: 'invalid email or password'});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const editusername = async(req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatepassword = async(req, res) => {
  try {
    const userId = req.user._id;
    const { oldpassword, newpassword, confirmpassword } = req.body;

    if (!oldpassword || !newpassword || !confirmpassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (newpassword !== confirmpassword) {
      return res.status(400).json({ error: "New password and confirm password do not match" });
    }

    if (oldpassword === newpassword) {
      return res.status(400).json({ error: "old password and new password should be different" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

const deleteaccount = async (req, res) => {
  try {
    const userId = req.user._id; // logged in user

    // Delete all projects created by user
    const projects = await Project.find({ owner: userId });

    for (let project of projects) {
      // Delete all tasks inside each project
      await Task.deleteMany({ projectId: project._id });

      // Delete all comments inside each project
      await Comment.deleteMany({ projectId: project._id });

      // Delete the project itself
      await Project.findByIdAndDelete(project._id);
    }

    // Finally, delete user
    await User.findByIdAndDelete(userId);

    res.json({ message: "Account and all related data deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkauth = async(req, res) => {
    res.json(req.user);
}

module.exports = {register, login, editusername, updatepassword, logout, deleteaccount, checkauth};