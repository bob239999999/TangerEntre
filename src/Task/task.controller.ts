import { Controller, Post, Patch, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './create-task.dto';
import { Task } from './task.schema';


@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Patch(':id')
    async assignTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,) {
        return this.taskService.updateTask(id, updateTaskDto);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string): Promise<void> {
        return this.taskService.remove(id);
    }


    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.create(createTaskDto);
    }

    @Get()
    async getAllTask(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<Task | null> {
        return this.taskService.findOne(id);
    }

    @Put(':id')
    async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: { title?: string; description?: string; status?: string; projectId?: number; assignedTo?: string }
    ): Promise<Task | null> {
        return this.taskService.update(id, updateTaskDto);
    }

}
