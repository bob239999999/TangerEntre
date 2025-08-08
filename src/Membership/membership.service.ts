import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Membership } from './membership.schema';
import { Model } from 'mongoose';


@Injectable()
export class MembershipService {

    constructor(@InjectModel('Membership') private readonly membershipModel: Model<Membership>) { }

    async create(createMembershipDto): Promise<Membership> {
        const membership = new this.membershipModel(createMembershipDto);
        return membership.save();
    }

    async findAll(): Promise<Membership[]> {
        return this.membershipModel.find().exec();
    }

    async findOne(id: string): Promise<Membership | null> {
        return this.membershipModel.findById(id).exec();
    }

    async update(id: string, updateMembershipDto): Promise<Membership | null> {
        return this.membershipModel.findByIdAndUpdate(id, updateMembershipDto, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.membershipModel.findByIdAndDelete(id).exec();
    }
}
