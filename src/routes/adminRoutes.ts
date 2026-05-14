import { Router, Response, NextFunction } from 'express';
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

router.get('/products', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Product, as: 'category' }],
    });

    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
});

router.get('/orders', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Product, as: 'products' }],
      order: [['createdAt', 'DESC']],
    });

    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
});

export default router;
