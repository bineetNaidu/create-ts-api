import { createConnection, getConnectionOptions } from 'typeorm';

export const createTypeORMConnection = async () => {
  const options = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...options, name: 'default' });
};
