import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProjectService } from 'src/Project/project.service';
import { CreateProjectDto } from './project-task.dto';
import { Project } from './project.schema';
import { Membership } from 'src/Membership/membership.schema';
import { Task } from 'src/Task/task.schema';
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
    ): Promise<Task | null> {
        return this.projectService.addTaskToProject(projectId, taskId);
    }

    @Get(':id/tasks')
    async getProjectTask(
        @Param('id') projectId: string,
    ): Promise<Task[]> {
        return this.projectService.getTasksProject(projectId);
    }


    @Post()
    async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectService.create(createProjectDto);
    }

    @Get()
    async getAllProject(): Promise<Project[]> {
        return this.projectService.findAll();
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
    async deleteProject(@Param('id') id: string): Promise<void> {
        return this.projectService.remove(id);
    }

}
