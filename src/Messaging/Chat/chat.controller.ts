import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessageDto } from './chat-message.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post('send')
    async sendMessage(@Body() dto: ChatMessageDto) {
        return this.chatService.sendMessage(dto);
    }

    @Get('messages')
    async getMessages() {
        return this.chatService.getMessages();
    }
}
