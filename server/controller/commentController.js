const { Comment } = require('../model/commentSchema');

const addcomment = async(req, res) => {
    try{
        const comment = await Comment.create({
            projectId: req.body.projectId,
            userId: req.user.id,
            message: req.body.message
        });
        res.status(201).json(comment);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

const getcomment = async(req, res) => {
    try {
        const comments = await Comment.find({projectId: req.params.projectId}).populate('userId', 'name email');
        res.json(comments);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

module.exports = {addcomment, getcomment};