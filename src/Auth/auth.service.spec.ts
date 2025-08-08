import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../User/user.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      createUser: jest.fn().mockResolvedValue({ id: 1, name: 'Test', email: 'test@example.com', password: 'hashed' }),
      findByEmail: jest.fn(),
    };
    jwtService = {
      signAsync: jest.fn().mockResolvedValue('fake-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should create a user and return message/email', async () => {
      const result = await service.signup('Test', 'test@example.com', 'password');
      expect(result).toEqual({ message: 'User signed up', email: 'test@example.com' });
      expect(usersService.createUser).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should return user not found if user does not exist', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue(null);
      const result = await service.login('notfound@example.com', 'password');
      expect(result).toEqual({ message: 'User not found' });
    });

    it('should return invalid password if password is incorrect', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashed' });
      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(false);
      const result = await service.login('test@example.com', 'wrongpassword');
      expect(result).toEqual({ message: 'Invalid password' });
    });

    it('should return access_token if credentials are valid', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashed' });
      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(true);
      const result = await service.login('test@example.com', 'password');
      expect(result).toEqual({ access_token: 'fake-jwt-token' });
      expect(jwtService.signAsync).toHaveBeenCalled();
    });
  });
});
