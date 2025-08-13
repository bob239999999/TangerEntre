import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty({ example: 'Implement authentication system' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Create login, signup, and password reset features' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 'TODO', enum: ['TODO', 'DOING', 'DONE'] })
    @IsEnum(['TODO', 'DOING', 'DONE'])
    status: 'TODO' | 'DOING' | 'DONE';

    @ApiProperty({ example: '689a100189f1cc8e664de0b8' })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    projectId: string;

    @ApiProperty({ example: '689a0b6689f1cc8e664de0a9' })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    assignedTo: string;
}

export class UpdateTaskDto {
    @ApiPropertyOptional({ example: 'Update authentication system' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ example: 'Add two-factor authentication' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: 'DOING', enum: ['TODO', 'DOING', 'DONE'] })
    @IsOptional()
    @IsEnum(['TODO', 'DOING', 'DONE'])
    status?: 'TODO' | 'DOING' | 'DONE';

    @ApiPropertyOptional({ example: '689a100189f1cc8e664de0b8' })
    @IsOptional()
    @IsString()
    @IsMongoId()
    projectId?: string;

    @ApiPropertyOptional({ example: '689a0b6689f1cc8e664de0a9' })
    @IsOptional()
    @IsString()
    @IsMongoId()
    assignedTo?: string;
}