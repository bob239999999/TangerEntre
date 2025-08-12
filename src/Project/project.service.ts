import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectSchema, Project } from './project.schema';
import { Model } from 'mongoose';
import { TaskModule } from 'src/Task/task.module';
import { Task } from 'src/Task/task.schema';
import { Membership } from 'src/Membership/membership.schema';

import { PaginationDto } from './pagination.dto';


@Injectable()
export class ProjectService {

    constructor(
        @InjectModel('Project') private readonly projectModel: Model<Project>,
        @InjectModel('Task') private readonly taskModel: Model<Task>,
        @InjectModel('Membership') private readonly membershipModel: Model<Membership>
    ) { }

    async create(createProjectDto): Promise<Project> {
        const Project = new this.projectModel(createProjectDto);
        return Project.save();
    }

    async findAll(): Promise<Project[]> {
        return this.projectModel.find().exec();
    }

    async findOne(id: string): Promise<Project | null> {
        return this.projectModel.findById(id).exec();
    }

    async update(id: string, updateProjectDto): Promise<Project | null> {
        return this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.projectModel.findByIdAndDelete(id).exec();
    }

    async assignUserToProject(projectId: string, userId: string, role: string): Promise<Membership> {

        const membership = new this.membershipModel({ userId, projectId, role });
        return membership.save();

    }

    async assignTaskofProjectToNewUser(projectId: string, taskId: string, userId: string): Promise<Project | null> {
        const updatedProject = await this.projectModel.findByIdAndUpdate(
            projectId,
            { $push: { tasks: taskId } },
            { new: true }
        ).exec();

        await this.taskModel.findByIdAndUpdate(
            taskId,
            { $set: { assignedTo: userId } }
        ).exec();

        return updatedProject;
    }

    async addTaskToProject(projectId: string, taskId: string): Promise<Task | null> {
        try {

            const project = await this.projectModel.findById(projectId);
            if (!project) {
                throw new Error('Project not found');
            }


            const updatedTask = await this.taskModel.findByIdAndUpdate(
                taskId,
                { projectId: projectId },
                { new: true }
            );

            if (!updatedTask) {
                throw new Error('Task not found');
            }


            await this.projectModel.findByIdAndUpdate(
                projectId,
                { $addToSet: { tasks: taskId } },
                { new: true }
            );

            return updatedTask;
        } catch (error) {
            console.error('Error adding task to project:', error);
            throw error;
        }
    }

    async getTasksProject(projectId: string): Promise<Task[]> {
        return this.taskModel.find({ projectId: projectId }).exec();
    }

    async getMembership(userId: string): Promise<Membership | null> {
        return await this.membershipModel.findOne({ userId }).exec();
    }


    async getAllProduct(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;

        const tasks = await this.projectModel.find()
            .skip(offset)
            .limit(limit)
            .exec();

        const total = await this.projectModel.countDocuments().exec();

        return {
            data: tasks,
            count: total,
        };
    }

    async getAllTask(paginationDto: PaginationDto, projectId: string) {
        const { limit = 10, offset = 0 } = paginationDto;

        const tasks = await this.taskModel.find()
            .skip(offset)
            .limit(limit)
            .exec();

        const total = await this.taskModel.countDocuments().exec();

        return {
            data: tasks,
            count: total,
        };
    }

}
