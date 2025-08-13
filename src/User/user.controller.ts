import { Controller, UseGuards, Request, Post, Body, Get, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto'; // Import du DTO
import { UpdateUserDto } from './update-user.dto'; // Import du DTO pour la mise à jour
import { JwtAuthGuard } from '../Auth/jwt.guard'; // Import du guard JWT
import { ApiBearerAuth, ApiParam, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private readonly usersService: UsersService) { }


    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get logged-in user details' }) // Route description
    @ApiResponse({ status: 200, description: 'Successfully retrieved user', type: CreateUserDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getUserMe(@Request() req): Promise<User | null> {
        const userId = req.user.userId;
        return this.usersService.findOne(userId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created', type: CreateUserDto })
    @ApiResponse({ status: 400, description: 'Validation error' })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        const { name, email, password } = createUserDto;
        return this.usersService.createUser(name, email, password);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of users', type: [CreateUserDto] })
    async getAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        description: 'The ID of the user',
        example: '64f8a1c2e7d3b4a1f0d5c9e7'
    })

    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'User found', type: CreateUserDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getUserById(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findOne(id);
    }



    @Put(':id')
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiResponse({ status: 200, description: 'User updated', type: CreateUserDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User | null> {
        return this.usersService.update(id, updateUserDto);
    }



    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiResponse({ status: 200, description: 'User deleted' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async deleteUser(@Param('id') id: string): Promise<{ message: string }> {

        const deleted = await this.usersService.remove(id);
        if (!deleted) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return { message: `User with ID ${id} successfully deleted` };
    }


}
