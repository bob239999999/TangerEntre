import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SongDocument = Song & Document;

@Schema()
export class Song {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Buffer })
  audio: Buffer;

  @Prop()
  mimetype: string;

  @Prop()
  filename: string;

  @Prop()
  filepath: string;

  @Prop()
  size: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SongSchema = SchemaFactory.createForClass(Song);