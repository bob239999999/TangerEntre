import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SongSchema, SongDocument, Song } from './song.schema';
import * as fs from 'fs';

@Injectable()
export class SongService {
    constructor(
        @InjectModel('Song') private songModel: Model<SongDocument>,
    ) { }

    async handleAudioFile(
        file: Express.Multer.File,
        title: string,
        userId: string
    ): Promise<{ message: string; id: string }> {
        if (!file) {
            throw new Error('Le fichier audio est requis');
        }

        const song = new this.songModel({
            title,
            userId,
            audio: file.buffer, // Stocker en Buffer
            mimetype: file.mimetype,
            filename: file.originalname,
            size: file.size,
        });

        const saved: SongDocument = await song.save();
        return { message: 'Audio enregistré', id: (saved._id as any).toString() };
    }

    async getAudioById(id: string): Promise<{ audio: Buffer; mimetype?: string; filename?: string }> {
        const song = await this.songModel.findById(id).exec();
        if (!song) {
            throw new Error('Audio non trouvé');
        }

        if (song.audio && song.audio.length) {
            return {
                audio: song.audio,
                mimetype: song.mimetype,
                filename: song.filename,
            };
        }

        if (song.filepath) {
            try {
                const audioBuffer = fs.readFileSync(song.filepath);
                return {
                    audio: audioBuffer,
                    mimetype: song.mimetype,
                    filename: song.filename,
                };
            } catch (error) {
                throw new Error('Impossible de lire le fichier audio');
            }
        }

        throw new Error('Audio non trouvé');
    }

    async findAll(): Promise<Song[]> {
        return this.songModel.find().select('-audio').exec();
    }
}