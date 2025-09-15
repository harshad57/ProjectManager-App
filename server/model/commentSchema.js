import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    projectId: {type: mongoose.Schema.Types.ObjectId, ref:'Project', required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    message: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

export const Comment = mongoose.model('Comment', commentSchema);