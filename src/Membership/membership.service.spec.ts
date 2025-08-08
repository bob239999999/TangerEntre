import { MembershipService } from './membership.service';

describe('MembershipService', () => {
  let service: MembershipService;

  beforeEach(() => {
    service = new MembershipService({} as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a membership', async () => {
    const mockMembership = { userId: '1', projectId: '2', role: 'admin' };
    jest.spyOn(service, 'create').mockResolvedValue(mockMembership as any);

    const result = await service.create(mockMembership);
    expect(result).toEqual(mockMembership);
  });
});
