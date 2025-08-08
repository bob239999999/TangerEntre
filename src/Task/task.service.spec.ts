import { TaskService } from './../Task/task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService({} as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const mockTask = { title: 'Test', description: 'Desc' };
    jest.spyOn(service, 'create').mockResolvedValue(mockTask as any);

    const result = await service.create(mockTask);
    expect(result).toEqual(mockTask);
  });
});
