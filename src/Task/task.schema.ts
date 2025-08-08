import { Schema, Document, Types } from 'mongoose';
import { User } from 'src/User/user.schema';

export const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['TODO', 'DOING', 'DONE'],
        default: 'TODO',
    },
    projectId: { type: Types.ObjectId, ref: 'Project' },
    assignedTo: { type: Types.ObjectId, ref: 'User' },
});

export interface Task extends Document {
    title: string;
    description: string;
    status: 'TODO' | 'DOING' | 'DONE';
    projectId: Types.ObjectId;
    assignedTo: User | Types.ObjectId;
}