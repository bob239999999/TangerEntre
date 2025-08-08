import { Controller, UseGuards, Request, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto'; // Import du DTO
import { JwtAuthGuard } from 'src/Auth/jwt.guard'; // Import du guard JWT
@Controller('users')
export class UserController {

    constructor(private readonly usersService: UsersService) { }


    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getUserMe(@Request() req): Promise<User | null> {
        const userId = req.user.userId;
        return this.usersService.findOne(userId);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        const { name, email, password } = createUserDto;
        return this.usersService.createUser(name, email, password);
    }
    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findOne(id);
    }
    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: { name?: string; email?: string; password?: string }
    ): Promise<User | null> {
        const name = updateUserDto.name ?? '';
        const email = updateUserDto.email ?? '';
        const password = updateUserDto.password ?? '';

        return this.usersService.update(id, name, email, password);
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }

}
