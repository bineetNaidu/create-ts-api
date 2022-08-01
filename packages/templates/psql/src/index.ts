import 'express-async-errors';
import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './data-source';
import { configuration } from './utils/configuration';
import { __prod__ } from './utils/contants';

(async () => {
  try {
    const conn = await AppDataSource.initialize();

    if (!conn.isInitialized) {
      throw new Error('Database Connection has not been established yet!');
    }

    const port = configuration.port;
    app.listen(port, () => {
      console.log(`~~~~ Server Started ~~~~`);
      if (!__prod__) {
        console.log(`**** VISIT: http://localhost:${port} ****`);
      }
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();
