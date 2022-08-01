import { DataSource } from 'typeorm';
import { Tweet } from './modules/Tweet/tweet.entity';
import { configuration } from './utils/configuration';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: configuration.database.uri,
  synchronize:
    configuration.environment === 'test' ||
    configuration.environment === 'development',
  logging: configuration.environment === 'development',
  entities: [Tweet],
  subscribers: [],
  migrations: [],
});
