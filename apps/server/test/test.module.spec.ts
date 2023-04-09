import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { UserService } from '@/service/user.service';

describe('Define Check', () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  describe('User', () => {
    it('should be defined', () => {
      expect(moduleRef.get(UserService)).toBeDefined();
    });
  });
});
