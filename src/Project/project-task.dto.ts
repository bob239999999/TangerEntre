import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty({ description: 'Name of the project', example: 'My Awesome Project' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Description of the project', example: 'This project is about building a NestJS app.' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiPropertyOptional({ description: 'Updated owner (MongoDB ObjectId)', example: '60d21b4667d0d8992e610c85', type: String })
    @IsString()
    @IsNotEmpty()
    owner: string;

    @ApiPropertyOptional({ description: 'Updated task ID (MongoDB ObjectId)', example: '60d21b4967d0d8992e610c86', type: String })
    @IsOptional()
    @IsString()
    task?: string;
}

export class UpdateProjectDto {
    @ApiPropertyOptional({ description: 'Updated name of the project', example: 'Updated Project Name' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'Updated description', example: 'Updated project description' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: 'Updated owner (MongoDB ObjectId)', example: '60d21b4667d0d8992e610c85', type: String })
    @IsOptional()
    @IsString()
    owner?: string;

    @ApiPropertyOptional({ description: 'Updated task ID (MongoDB ObjectId)', example: '60d21b4967d0d8992e610c86', type: String })
    @IsOptional()
    @IsString()
    task?: string;
}
