import { IsString, IsEnum, IsEmail, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(['TODO', 'DOING', 'DONE'])
    status: 'TODO' | 'DOING' | 'DONE';

    @IsOptional()
    @IsInt()
    projectId?: number;

    @IsOptional()
    assignedTo?: string;
}


export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(['TODO', 'DOING', 'DONE'])
    status?: 'TODO' | 'DOING' | 'DONE';

    @IsOptional()
    @IsInt()
    projectId?: number;

    @IsOptional()
    assignedTo?: string;
}
