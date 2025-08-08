import { IsString, IsOptional, IsEnum, IsNotEmpty, IsInt } from 'class-validator';
import { Document, Types } from 'mongoose';


export class MembershipDto {
    @IsInt()
    @IsNotEmpty()
    userId: Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    projectId: Types.ObjectId;

    @IsEnum(["Owner", "Contribuidor", "Viewer"])
    @IsNotEmpty()
    role: "Owner" | "Contribuidor" | "Viewer";
}

export class UpdateMembershipDto {
    @IsOptional()
    @IsInt()
    userId?: string;

    @IsOptional()
    @IsString()
    projectId?: string;

    @IsOptional()
    @IsEnum(["Owner", "Contribuidor", "Viewer"])
    role?: "Owner" | "Contribuidor" | "Viewer";
}
