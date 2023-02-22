import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";

export class AppService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) { }

  async runSeeds() {
    await runSeeders(this.dataSource);
  }
}