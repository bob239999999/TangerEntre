import { Controller, Post, Body, Query, Get, Param, Put, Delete, ForbiddenException } from '@nestjs/common';
import { ProjectService } from 'src/Project/project.service';
import { CreateProjectDto } from './project-task.dto';
import { CreateTaskDto } from '../Task/create-task.dto';
import { Project } from './project.schema';
import { Membership } from 'src/Membership/membership.schema';
import { Task } from 'src/Task/task.schema';
import { PaginationDto } from './pagination.dto';
import { ApiBearerAuth, ApiQuery, ApiBody, ApiParam, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MembershipDto } from 'src/Membership/membership.dto';
import { UpdateProjectDto } from './project-task.dto';

@ApiTags('Projects')
@Controller('project')
export class ProjectController {

    constructor(private readonly projectService: ProjectService) { }

    @Post(':id/invite')
    @ApiOperation({ summary: 'Invite a user to a project' })
    @ApiParam({ name: 'id', description: 'Project ID' })
    @ApiBody({ schema: { example: { userId: 'USER_ID_HERE', role: 'Viewer' } } })
    @ApiResponse({ status: 201, description: 'Membership created', type: MembershipDto })
    async inviteProject(
        @Param('id') projectId: string,
        @Body('userId') userId: string,
        @Body('role') role: string,
    ): Promise<Membership | null> {
        return this.projectService.assignUserToProject(projectId, userId, role);
    }

    @Post(':id/tasks')
    @ApiOperation({ summary: 'Add a task to a project' })
    @ApiBody({ schema: { example: { taskId: 'TASK_ID_HERE', userId: 'USER_ID_HERE' } } })
    @ApiResponse({ status: 201, description: 'Task added', type: CreateTaskDto })
    async addTaskToProject(
        @Param('id') projectId: string,
        @Body('taskId') taskId: string,
        @Body('userId') userId: string,
    ): Promise<Task | null> {
        const membership = await this.projectService.getMembership(userId);
        if (!membership || membership.role !== 'Contribuidor') {
            throw new ForbiddenException('Only a Contribuitor can add tasks to the project.');
        }
        return this.projectService.addTaskToProject(projectId, taskId);
    }

    @Get(':id/tasks/:userId')
    @ApiOperation({ summary: 'Get tasks of a project for a specific user' })
    @ApiParam({ name: 'id', description: 'Project ID' })
    @ApiParam({ name: 'userId', description: 'User ID' })
    async getProjectTask(
        @Param('id') projectId: string,
        @Param('userId') userId: string,
    ): Promise<Task[]> {
        const membership = await this.projectService.getMembership(userId);
        if (!membership || membership.projectId.toString() !== projectId) {
            throw new ForbiddenException('Only members of this project can retrieve its tasks.');
        }
        return this.projectService.getTasksProject(projectId);
    }

    @Get(':id/tasks')
    @ApiOperation({ summary: 'Get all tasks of a project with pagination' })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'offset', required: false })
    async getAllTaskProjet(@Query() paginationDto: PaginationDto, @Param('id') projectId: string) {
        return this.projectService.getAllTask(paginationDto, projectId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new project' })
    @ApiBody({ type: CreateProjectDto })
    @ApiResponse({ status: 201, description: 'Project created', type: PaginationDto })
    async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectService.create(createProjectDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all projects with pagination' })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'offset', required: false })
    async getAllProject(@Query() paginationDto: PaginationDto) {
        return this.projectService.getAllProduct(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get project by ID' })
    @ApiParam({ name: 'id', description: 'Project ID' })
    async getProjectById(@Param('id') id: string): Promise<Project | null> {
        return this.projectService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a project' })
    @ApiParam({ name: 'id', description: 'Project ID' })
    @ApiBody({ type: UpdateProjectDto })
    async updateProject(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto
    ): Promise<Project | null> {
        return this.projectService.update(id, updateProjectDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a project' })
    @ApiParam({ name: 'id', description: 'Project ID' })
    @ApiBody({ schema: { example: { userId: 'USER_ID_HERE' } } })
    async deleteProject(
        @Param('id') projectId: string,
        @Body('userId') userId: string
    ): Promise<{ message: string }> {
        const membership = await this.projectService.getMembership(userId);
        if (!membership || membership.role !== 'Owner') {
            throw new Error('Only the Owner can delete the project.');
        }
        await this.projectService.remove(projectId);
        return { message: 'Project deleted successfully.' };
    }
}
