import { app } from './app';
import { ___prod___ } from './utils/contants';

const port = process.env.PORT || 4242;
app.listen(port, () => {
  console.log(`~~~~ Server Started ~~~~`);
  if (!___prod___) {
    console.log(`**** VISIT: http://localhost:${port} ****`);
  }
});
