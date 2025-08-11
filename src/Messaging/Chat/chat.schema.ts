import { Schema, Document } from 'mongoose';

export interface ChatMessage extends Document {
    user: string;
    text: string;
    timestamp?: Date;
}

export type ChatMessageDocument = ChatMessage;

export const ChatMessageSchema = new Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
