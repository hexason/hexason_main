import { AppModule } from '@/app.module';
import { SupplierService } from '@/service';
import { Test } from '@nestjs/testing';

describe('Supplier Service', () => {
  let service: SupplierService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    service = moduleRef.get<SupplierService>(SupplierService);
  });

  describe('createSupplier', () => {
    it('should return an supplier', async () => {
      try {
        const res = await service.createSupplier({
          name: "hexason",
          description: "hexason",
          logo: "https://z-p3-scontent.fsin15-1.fna.fbcdn.net/v/t39.30808-6/339479918_3061180614178603_5904555341040836354_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ENlAeBq_-hMAX_xhrSx&_nc_ht=z-p3-scontent.fsin15-1.fna&oh=00_AfCKnbBWSMAz1V6LwYSzRgqARW2XEggUQmmGyIxgZcAq1Q&oe=643C23A7",
        });
        return expect(res).toBe("hexason");
      } catch (e) {
        return expect(e.code).toBe("DUPLICAPLE_DATA");
      }
    })
  });
  describe('Add admin to supplier', () => {
    it("should return admin supplier", async () => {
      const supplier = await service.addAdminToSupplier({
        id: "64364d4829aeda71de8a6fa6",
        adminId: "85fda777-db58-4068-8003-c0f1c208ae94",
        roleId: "a5178a68-f040-4550-9d19-eb5607482bc7"
      });
      expect(supplier.supplierId).toBe("64364d4829aeda71de8a6fa6")
    })
  })
});