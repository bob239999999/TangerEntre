import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { getModelToken } from '@nestjs/mongoose';
import { Membership } from 'src/Membership/membership.schema';

describe('ProjectService', () => {
  let service: ProjectService;
  let membershipModel: any;

  beforeEach(async () => {
    membershipModel = {
      findOne: jest.fn().mockReturnValue({ exec: jest.fn() }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        { provide: getModelToken('Project'), useValue: {} },
        { provide: getModelToken('Task'), useValue: {} },
        { provide: getModelToken('Membership'), useValue: membershipModel },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a project', async () => {
    const mockProject = { name: 'Projet', description: 'Desc' };
    jest.spyOn(service, 'create').mockResolvedValue(mockProject as any);

    const result = await service.create(mockProject);
    expect(result).toEqual(mockProject);
  });

  describe('getMembership', () => {
    it('should call membershipModel.findOne with userId', async () => {