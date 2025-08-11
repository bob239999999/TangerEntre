import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from './chat.schema';
import { ChatMessageDto } from './chat-message.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel('ChatMessage') private chatModel: Model<ChatMessageDocument>,
    ) { }

    async sendMessage(dto: ChatMessageDto) {
        const created = new this.chatModel(dto);
        await created.save();
        return { message: 'Message envoyé' };
    }

    async getMessages() {
        return this.chatModel.find().sort({ timestamp: 1 }).exec();
    }
}
