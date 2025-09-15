const { Task } = require('../model/taskSchema');
const { Project } = require('../model/projectSchema');

const addtask = async(req, res) => {
    try {
        const {projectId, title, description, status, priority} = req.body;
        const project = await Project.findById(req.body.projectId);
        if(!project) return res.status(404).json({message:'project not found'});

        const task = await Task.create({
            projectId: projectId,
            title: title?.trim(),
            description: description?.trim(),
            status: status,
            priority: priority
        });
        res.status(201).json(task);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

const gettask = async(req, res) => {
    try{
        const tasks = await Task.find({projectId: req.params.projectId}).populate('assignedTo', 'name email');
        res.json(tasks);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

const updatetask = async(req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(task);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

const deletetask = async(req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({message: 'task deleted'});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

module.exports = {addtask, gettask, updatetask, deletetask};