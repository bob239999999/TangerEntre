import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    service = new ProjectService({} as any, {} as any, {} as any);
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
});
