import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: jest.Mocked<ProjectService>;

  beforeEach(async () => {
    service = {
      getMembership: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<ProjectService>;

    controller = new ProjectController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deleteProject', () => {

    it('should delete project if user is Owner', async () => {
      service.getMembership.mockResolvedValue({
        _id: 'membershipId',
        userId: '68948615da85d06833997390',
        projectId: 'projectId',
        role: 'Owner',

      } as any);
      service.remove.mockResolvedValue(undefined);

      await expect(controller.deleteProject('projectId', '68948615da85d06833997390')).resolves.toBeUndefined();
      expect(service.getMembership).toHaveBeenCalledWith('68948615da85d06833997390');
      expect(service.remove).toHaveBeenCalledWith('projectId');
    });

    it('should throw error if user is not Owner', async () => {
      service.getMembership.mockResolvedValue({
        _id: 'membershipId2',
        userId: '6894866eda85d06833997392',
        projectId: 'projectId',
        role: 'Viewer',
      } as any);

      await expect(controller.deleteProject('projectId', '6894866eda85d06833997392')).rejects.toThrow('Only the Owner can delete the project.');
    });

    it('should throw error if membership not found', async () => {
      service.getMembership.mockResolvedValue(null);

      await expect(controller.deleteProject('projectId', '6894eb43da85d06833997394')).rejects.toThrow('Only the Owner can delete the project.');
    });
  });

  describe('addTaskToProject', () => {
    it('should add task if user is Contribuidor', async () => {
      service.getMembership.mockResolvedValue({
        _id: 'membershipId',
        userId: '68948615da85d06833997390',
        projectId: 'projectId',
        role: 'Contribuidor',
      } as any);
      service.addTaskToProject = jest.fn().mockResolvedValue({ _id: 'taskId' } as any);

      await expect(controller.addTaskToProject('projectId', 'taskId', '68948615da85d06833997390')).resolves.toEqual({ _id: 'taskId' });
      expect(service.getMembership).toHaveBeenCalledWith('68948615da85d06833997390');
      expect(service.addTaskToProject).toHaveBeenCalledWith('projectId', 'taskId');
    });

    it('should throw error if user is not Contribuidor', async () => {
      service.getMembership.mockResolvedValue({
        _id: 'membershipId2',
        userId: '6894866eda85d06833997392',
        projectId: 'projectId',
        role: 'Viewer',
      } as any);

      await expect(controller.addTaskToProject('projectId', 'taskId', '6894866eda85d06833997392')).rejects.toThrow('Only a Contribuitor can add tasks to the project.');
    });

    it('should throw error if membership not found', async () => {
      service.getMembership.mockResolvedValue(null);

      await expect(controller.addTaskToProject('projectId', 'taskId', '6894eb43da85d06833997394')).rejects.toThrow('Only a Contribuitor can add tasks to the project.');
    });
  });

  describe('getProjectTask', () => {
    it('should return tasks if user is member of the project', async () => {
      service.getMembership.mockResolvedValue({
        _id: 'membershipId',
        userId: '68948615da85d06833997390',
        projectId: 'projectId',
        role: 'Contribuidor',
      } as any);
      service.getTasksProject = jest.fn().mockResolvedValue([{ _id: 'taskId' }] as any);

      await expect(controller.getProjectTask('projectId', '68948615da85d06833997390')).resolves.toEqual([{ _id: 'taskId' }]);
      expect(service.getMembership).toHaveBeenCalledWith('68948615da85d06833997390');
      expect(service.getTasksProject).toHaveBeenCalledWith('projectId');
    });

    it('should throw error if user is not member of the project', async () => {
      service.getMembership.mockResolvedValue({
        _id: 'membershipId2',
        userId: '6894866eda85d06833997392',
        projectId: 'otherProjectId',
        role: 'Viewer',
      } as any);

      await expect(controller.getProjectTask('projectId', '6894866eda85d06833997392')).rejects.toThrow('Only members of this project can retrieve its tasks.');
    });

    it('should throw error if membership not found', async () => {
      service.getMembership.mockResolvedValue(null);

      await expect(controller.getProjectTask('projectId', '6894eb43da85d06833997394')).rejects.toThrow('Only members of this project can retrieve its tasks.');
    });
  });
});
