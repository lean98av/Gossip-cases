import { Router, Response, NextFunction } from 'express';
import adminController from '../controllers/adminController';
import Product, { ProductAttributes } from '../models/product';
import Order, { OrderAttributes } from '../models/order';
import { Request, Response as ExpressResponse } from 'express';
import { adminAuth } from '../middleware/authMiddleware';
import Category from '../models/category';
import ProductImage from '../models/productImage';

const router = Router();

// Middleware de autenticación para rutas protegidas
const authMiddleware = adminAuth;

router.get('/login', async (req: Request, res: Response, next: NextFunction) => {
  const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
  const authCookie = req.cookies?.adminAuth;

  if (authCookie === ADMIN_PASS) {
    return res.redirect('/admin');
  }

  res.render('admin/adminHome', {
    title: 'Admin Panel - Gossip Cases',
    adminAuth: false,
  });
});

router.get('/logout', async (req: Request, res: Response, next: NextFunction) => {
  await adminController.logout(req, res, next);
});

// Rutas del admin panel (todas protegidas por autenticación)
router.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  await adminController.home(req, res, next);
});

router.get('/products', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  await adminController.adminProducts(req, res, next);
});

router.get('/products/create', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const products = await Product.findAll({
    include: [
      { model: Category, as: 'category' },
      { model: ProductImage, as: 'images' },
    ],
  });
  const categories = await Category.findAll();
  await res.render('admin/createEditProduct', {
    title: 'Create Product',
    products,
    categories,
    adminAuth: req.adminAuth,
  });
});

router.get('/products/:id/edit', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await adminController.getEditProduct(req, res, next);
});

router.post(
  '/products',
  authMiddleware,
  adminController.upload.array('images', 10),
  async (req: Request, res: Response, next: NextFunction) => {
    await adminController.createProduct(req, res, next);
  }
);

router.get('/products/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  await adminController.getProduct(req, res, next);
});

router.put(
  '/products/:id',
  authMiddleware,
  adminController.upload.array('images', 10),
  async (req: Request, res: Response, next: NextFunction) => {
    await adminController.editProduct(req, res, next);
  }
);

router.delete('/products/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  await adminController.deleteProduct(req, res, next);
});

router.get('/orders', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  await adminController.adminOrders(req, res, next);
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  await adminController.login(req, res, next);
});

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  await adminController.logout(req, res, next);
});

export default router;
