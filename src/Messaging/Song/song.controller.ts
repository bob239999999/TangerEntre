import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, Res, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SongService } from './song.service';
import { memoryStorage } from 'multer';
import type { Response } from 'express';

@Controller('song')
export class SongController {
    constructor(private readonly songService: SongService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('audio', {
        storage: memoryStorage(),
        limits: { fileSize: 50 * 1024 * 1024 },
    }))
    async uploadAudio(
        @UploadedFile() file: Express.Multer.File,
        @Body('title') title: string,
        @Body('userId') userId: string,
    ) {
        return this.songService.handleAudioFile(file, title, userId);
    }

    @Get()
    async getAllSongs() {
        return this.songService.findAll();
    }

    @Get(':id/audio')
    async getAudio(
        @Res() res: Response,
        @Param('id') id: string,
    ) {
        const audioData = await this.songService.getAudioById(id);
        res.set({
            'Content-Type': audioData.mimetype || 'audio/mpeg',
            'Content-Disposition': `inline; filename="${audioData.filename || 'audio.mp3'}"`,
        });
        res.send(audioData.audio);
    }
}