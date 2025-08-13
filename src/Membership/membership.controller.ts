import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { MembershipService } from './membership.service';
import { MembershipDto } from './membership.dto';
import { Membership } from './membership.schema';

@ApiTags('Membership') // Groups all endpoints under "Membership" in Swagger
@Controller('membership')
export class MembershipController {
    constructor(private readonly membershipService: MembershipService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new membership' })
    @ApiBody({ type: MembershipDto })
    @ApiResponse({ status: 201, description: 'Membership successfully created', type: MembershipDto })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    async createMembership(@Body() membershipDto: MembershipDto): Promise<Membership> {
        return this.membershipService.create(membershipDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all memberships' })
    @ApiResponse({ status: 200, description: 'List of memberships', type: [MembershipDto] })
    async getAllMemberships(): Promise<Membership[]> {
        return this.membershipService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a membership by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Membership ID' })
    @ApiResponse({ status: 200, description: 'Membership found', type: MembershipDto })
    @ApiResponse({ status: 404, description: 'Membership not found' })
    async getMembershipById(@Param('id') id: string): Promise<Membership | null> {
        return this.membershipService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a membership by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Membership ID' })
    @ApiBody({ type: MembershipDto })
    @ApiResponse({ status: 200, description: 'Membership updated', type: MembershipDto })
    @ApiResponse({ status: 404, description: 'Membership not found' })
    async updateMembership(
        @Param('id') id: string,
        @Body() updateMembershipDto: MembershipDto
    ): Promise<Membership | null> {
        return this.membershipService.update(id, updateMembershipDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a membership by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Membership ID' })
    @ApiResponse({ status: 200, description: 'Membership deleted' })
    @ApiResponse({ status: 404, description: 'Membership not found' })
    async deleteMembership(@Param('id') id: string): Promise<{ success: boolean; error?: string }> {
        try {
            await this.membershipService.remove(id);
            return { success: true };
        } catch (error) {
            return { success: false, error: error?.message || 'Unknown error' };
        }
    }
}
