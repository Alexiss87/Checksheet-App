import { Application } from 'express';
import checksheetRouter from './api/controllers/examples/checksheetRouter';
export default function routes(app: Application): void {
  app.use('/api/v1', checksheetRouter);
}
//
