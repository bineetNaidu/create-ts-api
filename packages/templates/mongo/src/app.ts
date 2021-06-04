import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { apiRoutes } from './api';
import { NotFoundError } from './utils/notFoundError';
import { ExpressErrorHandler } from './utils/ExpressErrorHandler';

dotenv.config();
const app = express();

app.set('trust proxy', true);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api', apiRoutes);

//! Not found page error
app.all('*', NotFoundError);

// ! Error Handlers
app.use(ExpressErrorHandler);

export default app;
