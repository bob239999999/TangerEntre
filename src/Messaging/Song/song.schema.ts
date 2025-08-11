import { Schema, Document } from 'mongoose';

export interface Song extends Document {
    title: string;
    audio: Buffer;
    userId: string;
    filename?: string;
    filepath?: string;
    mimetype?: string;
    size?: number;
}

export type SongDocument = Song;

export const SongSchema = new Schema({
    title: { type: String, required: true },
    audio: { type: Buffer },
    userId: { type: String, required: true },
    filename: { type: String },
    filepath: { type: String },
    mimetype: { type: String },
    size: { type: Number },
});



