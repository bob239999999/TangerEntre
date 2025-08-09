import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../User/user.service';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private usersService: UsersService) { }
    private users: { id: number; email: string; password: string }[] = [];


    async signup(name: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.createUser(name, email, hashedPassword);
        return { message: 'User signed up', email: user.email };
    }

    async login(email: string, password: string) {

        const user = await this.usersService.findByEmail(email);
        if (!user) return { message: 'User not found' };

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return { message: 'Invalid password' };

        const payload = { sub: user.id.toString(), email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return { access_token: token };
    }

}
