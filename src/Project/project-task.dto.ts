import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    owner: string;

    @IsOptional()
    @IsString()
    task?: string;
}
export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    owner?: string;

    @IsOptional()
    @IsString()
    task?: string;
}