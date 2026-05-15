import { Router, Response, NextFunction } from 'express';
import adminController from '../controllers/adminController';
import Product, { ProductAttributes } from '../models/product';
import Order, { OrderAttributes } from '../models/order';
import { Request } from 'express';

const router = Router();

// Middleware de autenticación para rutas protegidas
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const pass = req.query?.pass;
  const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

  if (pass !== ADMIN_PASS) {
    res.status(401).json({ success: false, message: 'Acceso denegado' });
    return;
  }

  next();
};

// Rutas del admin panel (todas protegidas por autenticación)
router.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  await adminController.home(req, res, next);
});

router.get('/products', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  await adminController.adminProducts(req, res, next);
});

router.get('/orders', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  await adminController.adminOrders(req, res, next);
});

export default router;
