import { Schema, Document, Types } from 'mongoose';

export interface Project extends Document {
    name: string;
    description: string;
    createdAt: Date;
    owner: any;
    task: any;
}

export const ProjectSchema = new Schema<Project>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        owner: { type: Types.ObjectId, ref: 'User', required: true },
        task: { type: Types.ObjectId, ref: 'Task' },
    },
    {
        timestamps: true,
    }
);
