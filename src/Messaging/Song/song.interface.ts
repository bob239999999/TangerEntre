import { Document } from 'mongoose';

export interface Song extends Document {
    title: string;
    audio: Buffer;
    userId: number;
}
