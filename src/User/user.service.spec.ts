import { UsersService } from './user.service';

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(() => {
        service = new UsersService({} as any);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a user', async () => {
        const mockUser = { name: 'John', email: 'john@example.com', password: 'pass' };
        jest.spyOn(service, 'createUser').mockResolvedValue(mockUser as any);

        const result = await service.createUser('John', 'john@example.com', 'pass');
        expect(result).toEqual(mockUser);
    });
});
