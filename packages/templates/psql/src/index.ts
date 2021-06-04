import 'express-async-errors';
import 'reflect-metadata';
import app from './app';
import { createConnection } from 'typeorm';
import { ___prod___ } from './utils/contants';
import { Tweet } from './enitities/Tweet';

(async () => {
  try {
    if (!process.env.DATABASE_URI) {
      throw new Error('??>> {" DATABASE_URI must be defined!! "} ');
    }

    const conn = await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URI,
      logging: true,
      synchronize: !___prod___,
      entities: [Tweet],
    });

    if (!conn.isConnected) {
      throw new Error('Database Connection has not been established yet!');
    }

    const port = process.env.PORT || 4242;
    app.listen(port, () => {
      console.log(`~~~~ Server Started ~~~~`);
      if (!___prod___) {
        console.log(`**** VISIT: http://localhost:${port} ****`);
      }
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();
