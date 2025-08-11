import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { SongSchema } from './song.schema';

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads', // dossier de stockage des fichiers audio
        }),
        MongooseModule.forFeature([{ name: 'Song', schema: SongSchema }]),
    ],
    controllers: [SongController],
    providers: [SongService],
})
export class SongModule { }
