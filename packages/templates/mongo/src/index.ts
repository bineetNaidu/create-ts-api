import 'express-async-errors';
import mongoose from 'mongoose';
import app from './app';
import { ___prod___ } from './utils/contants';

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('??>> {" MONGO_URI must be defined!! "} ');
    }
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

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
