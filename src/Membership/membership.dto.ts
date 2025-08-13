import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MembershipDto {
    @ApiProperty({ description: 'User ID', type: String, example: '64f9e2b6c3a2b1f0d1234567' })
    @IsNotEmpty()
    userId: Types.ObjectId;

    @ApiProperty({ description: 'Project ID', type: String, example: '64f9e2b6c3a2b1f0d7654321' })
    @IsNotEmpty()
    projectId: Types.ObjectId;

    @ApiProperty({
        description: 'Role of the user',
        enum: ["Owner", "Contribuidor", "Viewer"],
        example: "Viewer"
    })
    @IsEnum(["Owner", "Contribuidor", "Viewer"])
    @IsNotEmpty()
    role: "Owner" | "Contribuidor" | "Viewer";
}

export class UpdateMembershipDto {
    @ApiPropertyOptional({ description: 'User ID', type: String, example: '64f9e2b6c3a2b1f0d1234567' })
    @IsOptional()
    userId?: string;

    @ApiPropertyOptional({ description: 'Project ID', type: String, example: '64f9e2b6c3a2b1f0d7654321' })
    @IsOptional()
    projectId?: string;

    @ApiPropertyOptional({
        description: 'Role of the user',
        enum: ["Owner", "Contribuidor", "Viewer"],
        example: "Contribuidor"
    })
    @IsOptional()
    @IsEnum(["Owner", "Contribuidor", "Viewer"])
    role?: "Owner" | "Contribuidor" | "Viewer";
}
