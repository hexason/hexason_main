import { Admin } from "@/lib/models";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

export class AdminService {
  adminRepo: Repository<Admin>
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { 
    this.adminRepo = this.dataSource.getRepository(Admin);
  }

  async getAdminByEmail({email}) {
    const admin = await this.adminRepo.findOneBy({
      email
    })
    return admin;
  }
}