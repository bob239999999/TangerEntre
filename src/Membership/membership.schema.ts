import { Schema, Document, Types } from 'mongoose';

export interface Membership extends Document {
    userId: Types.ObjectId;
    projectId: string;
    role: 'Owner' | 'Contribuidor' | 'Viewer';
}

export const MembershipSchema = new Schema<Membership>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: String, required: true },
    role: { type: String, enum: ['Owner', 'Contribuidor', 'Viewer'], required: true }
});

