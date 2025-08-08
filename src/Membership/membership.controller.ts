import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipDto } from './membership.dto';
import { Membership } from './membership.schema';


@Controller('membership')
export class MembershipController {
    constructor(private readonly membershipService: MembershipService) { }

    @Post()
    async createMembership(@Body() membershipDto: MembershipDto): Promise<Membership> {
        return this.membershipService.create(membershipDto);
    }

    @Get()
    async getAllMemberships(): Promise<Membership[]> {
        return this.membershipService.findAll();
    }

    @Get(':id')
    async getMembershipById(@Param('id') id: string): Promise<Membership | null> {
        return this.membershipService.findOne(id);
    }

    @Put(':id')
    async updateMembership(
        @Param('id') id: string,
        @Body() updateMembershipDto: MembershipDto
    ): Promise<Membership | null> {
        return this.membershipService.update(id, updateMembershipDto);
    }

    @Delete(':id')
    async deleteMembership(@Param('id') id: string): Promise<void> {
        return this.membershipService.remove(id);
    }
}
