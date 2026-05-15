import { Router, Response, NextFunction } from 'express';
import adminController from '../controllers/adminController';
import Product, { ProductAttributes } from '../models/product';
import Order, { OrderAttributes } from '../models/order';
import { Request } from 'express';

const router = Router();

router.use((req: { query: { pass?: string } }, res: Response, next: NextFunction) => {
  const pass = (req as any).query?.pass;
  const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

  if (pass !== ADMIN_PASS) {
    res.status(401).json({ success: false, message: 'Acceso denegado' });
    return;
  }

  next();
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await adminController.home(req, res, next);
});

router.get('/products', async (req: Request, res: Response, next: NextFunction) => {
  await adminController.adminProducts(req, res, next);
});

router.get('/orders', async (req: Request, res: Response, next: NextFunction) => {
  await adminController.adminOrders(req, res, next);
});

export default router;
