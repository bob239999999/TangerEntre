import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { UpdateUserDto } from '../src/User/update-user.dto';
import { CreateProjectDto } from '../src/Project/project-task.dto';
import { CreateTaskDto } from '../src/Task/create-task.dto';
import { MembershipDto } from '../src/Membership/membership.dto';

async function seedData() {
    console.log('🌱 Starting data seeding...');
    const app = await NestFactory.createApplicationContext(AppModule);

    try {
        const userModel = app.get<Model<UpdateUserDto>>(getModelToken(UpdateUserDto.name));
        const projectModel = app.get<Model<CreateProjectDto>>(getModelToken(CreateProjectDto.name));
        const taskModel = app.get<Model<CreateTaskDto>>(getModelToken(CreateTaskDto.name));
        const membershipModel = app.get<Model<MembershipDto>>(getModelToken(MembershipDto.name));

        // Nettoyer les données existantes
        console.log('🧹 Cleaning existing data...');
        await Promise.all([
            userModel.deleteMany({}),
            projectModel.deleteMany({}),
            taskModel.deleteMany({}),
            membershipModel.deleteMany({})
        ]);

        // Données de test
        const users = [
            { _id: '689a07b889f1cc8e664de0a2', name: 'Ahmed Hassan', email: 'ahmed@gmail.com', password: 'hashedPassword123' },
            { _id: '689a07b889f1cc8e664de0a3', name: 'Sarah Connor', email: 'sarah@gmail.com', password: 'hashedPassword123' },
            { _id: '689a0b6689f1cc8e664de0a9', name: 'John Doe', email: 'john@example.com', password: 'hashedPassword123' }
        ];

        const projects = [
            { _id: '689a100189f1cc8e664de0b8', name: 'E-commerce Platform', description: 'Building a modern e-commerce platform', owner: '689a07b889f1cc8e664de0a2' },
            { _id: '689a100189f1cc8e664de0b9', name: 'Mobile App', description: 'Cross-platform mobile application', owner: '689a07b889f1cc8e664de0a3' }
        ];

        const tasks = [
            { _id: '689a1829dec04c861ae9eac8', title: 'Implement Authentication', description: 'Create login and signup functionality', status: 'TODO', projectId: '689a100189f1cc8e664de0b8', assignedTo: '689a0b6689f1cc8e664de0a9' },
            { _id: '689a1829dec04c861ae9eac9', title: 'Design Database Schema', description: 'Create MongoDB collections and relationships', status: 'DOING', projectId: '689a100189f1cc8e664de0b8', assignedTo: '689a07b889f1cc8e664de0a2' }
        ];

        const memberships = [
            { userId: '689a07b889f1cc8e664de0a2', projectId: '689a100189f1cc8e664de0b8', role: 'Owner' },
            { userId: '689a0b6689f1cc8e664de0a9', projectId: '689a100189f1cc8e664de0b8', role: 'Contribuidor' },
            { userId: '689a07b889f1cc8e664de0a3', projectId: '689a100189f1cc8e664de0b9', role: 'Owner' }
        ];

        // Insérer les données
        console.log('👥 Creating users...');
        await userModel.insertMany(users);

        console.log('📁 Creating projects...');
        await projectModel.insertMany(projects);

        console.log('📋 Creating tasks...');
        await taskModel.insertMany(tasks);

        console.log('🎭 Creating memberships...');
        await membershipModel.insertMany(memberships);

        console.log('✅ Data seeding completed successfully!');
        console.log(`Created: ${users.length} users, ${projects.length} projects, ${tasks.length} tasks, ${memberships.length} memberships`);
    } catch (error) {
        console.error('❌ Error during seeding:', error);
        process.exit(1);
    } finally {
        await app.close();
    }
}

seedData();
