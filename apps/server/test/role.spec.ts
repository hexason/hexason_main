import { AppModule } from '@/app.module';
import { AdminService } from '@/service';
import { Test } from '@nestjs/testing';

describe('Role testing', () => {
  let service: AdminService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = moduleRef.get<AdminService>(AdminService);
  });

  describe('Role testing', () => {
    it('should defined', async () => {
      const roleName = Date.now().toString(32);
      const role = await service.roleAdd(roleName);
      expect(role.name).toBe(roleName);
      const permission = await service.permissionAdd({
        roleId: role.id,
        key: Date.now().toString(),
        code: 600,
      });
      expect(permission.permissions.length).toBe(role.permissions.length + 1);
    });
  });
});
