import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { App } from '../app.model';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const repository = dataSource.getRepository(App);
    if(await repository.count() > 0) return;
    await repository.insert([
      {
        name: "primary.color.100",
        config: '#B2F5EA',
        type: 'config.color',
      },
      {
        name: "primary.color.200",
        config: '#81E6D9',
        type: 'config.color',
      },
      {
        name: "primary.color.300",
        config: '#4FD1C5',
        type: 'config.color',
      },
      {
        name: "primary.color.400",
        config: '#38B2AC',
        type: 'config.color',
      },
      {
        name: "primary.color.500",
        config: '#319795',
        type: 'config.color',
      },
      {
        name: "primary.color.600",
        config: '#2C7A7B',
        type: 'config.color',
      },
      {
        name: "primary.color.700",
        config: '#285E61',
        type: 'config.color',
      },
      {
        name: "primary.color.800",
        config: '#234E52',
        type: 'config.color',
      },
      {
        name: "primary.color.900",
        config: '#1D4044',
        type: 'config.color',
      },
      {
        name: "app.title",
        config: 'My App',
        type: 'config.info',
      },
      {
        name: "app.description",
        config: 'My App Description',
        type: 'config.info',
      },
      {
        name: "app.version",
        config: '1.0.0',
        type: 'config.info',
      }
    ]);
  }
}