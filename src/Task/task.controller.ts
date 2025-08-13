import { Controller, Post, Patch, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './create-task.dto';
import { Task } from './task.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'Task successfully created', type: CreateTaskDto })
    @ApiBody({ type: CreateTaskDto })
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.create(createTaskDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({ status: 200, description: 'List of tasks', type: [CreateTaskDto] })
    async getAllTask(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a task by ID' })
    @ApiParam({ name: 'id', description: 'Task ID' })
    @ApiResponse({ status: 200, description: 'Task found', type: CreateTaskDto })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async getUserById(@Param('id') id: string): Promise<Task | null> {
        return this.taskService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a task by ID' })
    @ApiParam({ name: 'id', description: 'Task ID' })
    @ApiResponse({ status: 200, description: 'Task updated', type: CreateTaskDto })
    @ApiResponse({ status: 404, description: 'Task not found' })
    @ApiBody({ type: UpdateTaskDto })
    async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto
    ): Promise<Task | null> {
        return this.taskService.update(id, updateTaskDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Assign or update a task partially' })
    @ApiParam({ name: 'id', description: 'Task ID' })
    @ApiResponse({ status: 200, description: 'Task assigned or updated', type: CreateTaskDto })
    @ApiResponse({ status: 404, description: 'Task not found' })
    @ApiBody({ type: UpdateTaskDto })
    async assignTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.updateTask(id, updateTaskDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task by ID' })
    @ApiParam({ name: 'id', description: 'Task ID' })
    @ApiResponse({ status: 200, description: 'Task successfully deleted' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async deleteTask(@Param('id') id: string): Promise<{ message: string }> {
        await this.taskService.remove(id);
        return { message: `Task with ID ${id} successfully deleted` };
    }
}
