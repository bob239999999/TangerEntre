import { Test, TestingModule } from '@nestjs/testing';
import { SongService } from './song.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Repository } from 'typeorm';

describe('SongService', () => {
    let service: SongService;
    let repo: Repository<Song>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SongService,
                {
                    provide: getRepositoryToken(Song),
                    useValue: {
                        create: jest.fn().mockImplementation(dto => dto),
                        save: jest.fn().mockResolvedValue({ id: 1, ...{} }),
                    },
                },
            ],
        }).compile();

        service = module.get<SongService>(SongService);
        repo = module.get<Repository<Song>>(getRepositoryToken(Song));
    });

    it('should store audio in database', async () => {
        const file = { buffer: Buffer.from('audio-data') } as Express.Multer.File;
        const title = 'Test Song';
        const userId = 42;
        (repo.save as jest.Mock).mockResolvedValue({ id: 1, title, audio: file.buffer, userId });

        const result = await service.handleAudioFile(file, title, userId);
        expect(result).toEqual({ message: 'Audio enregistré', id: 1 });
        expect(repo.create).toHaveBeenCalledWith({ title, audio: file.buffer, userId });
        expect(repo.save).toHaveBeenCalled();
    });
});
