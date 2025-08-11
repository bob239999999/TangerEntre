import { IsString, IsOptional, IsNotEmpty, IsDateString } from 'class-validator';

export class ChatMessageDto {
    @IsString()
    @IsNotEmpty()
    user: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsOptional()
    @IsString()
    roomId?: string;

    @IsOptional()
    @IsString()
    recipientId?: string;

    @IsOptional()
    @IsDateString()
    timestamp?: string;
}

