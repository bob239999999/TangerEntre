import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema, User } from './../User/user.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async createUser(name: string, email: string, password: string): Promise<User> {
        const user = new this.userModel({ name, email, password });
        return user.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async update(id: string, name: string, email: string, password: string): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true }
        ).exec();
    }

    async remove(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id).exec();
    }
}
