import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskSchema, Task } from './../Task/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from './create-task.dto';
@Injectable()
export class TaskService {

    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }

    async create(createTaskDto): Promise<Task> {
        const task = new this.taskModel(createTaskDto);
        return task.save();
    }

    async findAll(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    async findOne(id: string): Promise<Task | null> {
        return this.taskModel.findById(id).exec();
    }

    async update(id: string, updateTaskDto): Promise<Task | null> {
        return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.taskModel.findByIdAndDelete(id).exec();
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
        return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    }


}
