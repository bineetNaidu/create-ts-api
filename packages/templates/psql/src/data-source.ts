import { DataSource } from 'typeorm';
import { Tweet } from './entities/Tweet';
import { configuration } from './utils/configuration';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: configuration.database.uri,
  synchronize: configuration.environment !== 'production',
  logging: configuration.environment === 'development',
  entities: [Tweet],
  subscribers: [],
  migrations: [],
});
