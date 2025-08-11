import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatMessageSchema } from './chat.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'ChatMessage', schema: ChatMessageSchema }]),
    ],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule { }
