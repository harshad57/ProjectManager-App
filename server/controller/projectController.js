const { Project } = require('../model/projectSchema');

const createproject = async (req, res) => {
  try {
    const { name, description, visibility } = req.body;
    const project = await Project.create({
      name: name?.trim(),
      description: description?.trim(),
      owner: req.user._id,
      visibility: visibility || "private"
    });
    await project.populate("owner", "name email");
    res.json(project);
    res.status(201).json({ project, message: 'project created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getprojects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id }).populate('owner', 'name email').sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getpublicprojects = async (req, res) => {
  try {
    const projects = await Project.find({ visibility: 'public' }).populate('owner', 'name email').sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const updateproject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this project" });
    }

    const { name, description, visibility } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(name && { name }),
          ...(description && { description }),
          ...(visibility && { visibility }),
        }
      },
      { new: true }
    );

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteproject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: 'project not found' });
    if (project.owner.toString() !== req.user.id) return res.status(403).json({ message: 'not authorized' });
    await project.deleteOne();
    res.json({ message: 'project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createproject, getprojects, getpublicprojects, updateproject, deleteproject };