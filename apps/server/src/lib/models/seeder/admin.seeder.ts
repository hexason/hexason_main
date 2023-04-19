import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Admin } from '../admin.model';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Admin);
    if ((await repository.count()) > 0) return;
    await repository.insert([
      {
        username: 'cn',
        name: 'Super Admin',
        credential: '$2b$10$zG4sWNxqYh79JPMNlPf0pe9Oc5si9Mywunw.GKs0MZ5xsUF5vV99e',
        role: 'super',
      },
    ]);
  }
}
