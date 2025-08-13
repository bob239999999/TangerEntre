import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema, User } from './../User/user.schema';
import { UpdateUserDto } from './update-user.dto';

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

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
        const user = await this.userModel.findById(id);
        if (!user) return null;

        Object.assign(user, updateUserDto);
        return user.save();
    }

    async remove(id: string): Promise<boolean> {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        return !!deletedUser;
    }

}
