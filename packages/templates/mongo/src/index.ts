import 'express-async-errors';
import * as mongoose from 'mongoose';
import app from './app';
import { configuration } from './utils/configuration';
import { __prod__ } from './utils/contants';

(async () => {
  try {
    await mongoose.connect(configuration.database.uri);

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
