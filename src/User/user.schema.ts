import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, default: true },
});

export interface User extends Document {
    id_user: number;
    name: string;
    email: string;
    password: string;
}

