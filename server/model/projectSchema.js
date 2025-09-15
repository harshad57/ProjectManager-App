import mongoose from "mongoose";
import slugify from "slugify";

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    slug: { type: String, unique: true },
    visibility: {type: String, enum: ['private', 'public'], default: 'private'},
    createdAt: {type: Date, default: Date.now}
},{timestamps: true});

projectSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.name + "-" + Date.now(), { lower: true, strict: true });
  }
  next();
});

export const Project = mongoose.model('Project', projectSchema);