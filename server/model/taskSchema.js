import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true},
    title: {type: String, required: true},
    description: String,
    status: {type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo'},
    priority: {type: String, enum: ['low', 'medium', 'high'], default: 'medium'},
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    createdAt: {type: Date, default: Date.now}
})

export const Task = mongoose.model('Task', taskSchema);