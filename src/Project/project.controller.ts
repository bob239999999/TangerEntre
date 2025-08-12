import { Controller, Post, Body, Query, Get, Param, Put, Delete } from '@nestjs/common';
import { ProjectService } from 'src/Project/project.service';
import { CreateProjectDto } from './project-task.dto';
import { Project } from './project.schema';
import { Membership } from 'src/Membership/membership.schema';
import { Task } from 'src/Task/task.schema';
import { PaginationDto } from './pagination.dto';

@Controller('project')
export class ProjectController {

    constructor(private readonly projectService: ProjectService) { }

    @Post(':id/invite')
    async inviteProject(
        @Param('id') projectId: string,
        @Body('userId') userId: string,
        @Body('role') role: string,
    ): Promise<Membership | null> {
        return this.projectService.assignUserToProject(projectId, userId, role);
    }

    @Post(':id/tasks')
    async addTaskToProject(
        @Param('id') projectId: string,
        @Body('taskId') taskId: string,
        @Body('userId') userId: string,
    ): Promise<Task | null> {
        const membership = await this.projectService.getMembership(userId);
        if (!membership || membership.role !== 'Contribuidor') {
            throw new Error('Only a Contribuitor can add tasks to the project.');
        }
        return this.projectService.addTaskToProject(projectId, taskId);
    }


    @Get(':id/tasks/:userId')
    async getProjectTask(
        @Param('id') projectId: string,
        @Param('userId') userId: string,
    ): Promise<Task[]> {
        const membership = await this.projectService.getMembership(userId);
        if (!membership || membership.projectId.toString() !== projectId) {
            throw new Error('Only members of this project can retrieve its tasks.');
        }
        return this.projectService.getTasksProject(projectId);
    }

    @Get(':id/tasks')
    async getAllTaskProjet(@Query() paginationDto: PaginationDto,
        @Param('id') projectId: string,
    ) {
        return this.projectService.getAllTask(paginationDto, projectId);
    }

    @Post()
    async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectService.create(createProjectDto);
    }

    @Get()
    async getAllProject(@Query() paginationDto: PaginationDto) {
        return this.projectService.getAllProduct(paginationDto);
    }

    @Get(':id')
    async getProjectById(@Param('id') id: string): Promise<Project | null> {
        return this.projectService.findOne(id);
    }

    @Put(':id')
    async updateProject(
        @Param('id') id: string,
        @Body() updateProjectDto: { name?: string; description?: string; owner?: string; task?: string }
    ): Promise<Project | null> {
        return this.projectService.update(id, updateProjectDto);
    }
    @Delete(':id')
    async deleteProject(
        @Param('id') projectId: string,
        @Body('userId') userId: string
    ): Promise<void> {

        const membership = await this.projectService.getMembership(userId);
        if (!membership || membership.role !== 'Owner') {
            throw new Error('Only the Owner can delete the project.');
        }
        return this.projectService.remove(projectId);
    }

}
