import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import Order from '../models/order';
import Category from '../models/category';
import multer from 'multer';
import path from 'path';

export default {
  upload: multer({
    storage: multer.diskStorage({
      destination: (req: any, file: any, cb: any) => cb(null, path.join(__dirname, '../../uploads/')),
      filename: (req: any, file: any, cb: any) => cb(null, Date.now() + '-' + file.originalname),
    }),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req: any, file: any, cb: any) => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (validTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Solo se permiten imágenes JPG, PNG, GIF y WebP'));
      }
    },
  }),

  async home(req: Request, res: Response, next: NextFunction) {
    try {
      res.render('admin/adminHome', {
        title: 'Admin Panel - Gossip Cases',
      });
    } catch (error) {
      next(error);
    }
  },

  async adminProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await Product.findAll({
        include: [{ model: Category, as: 'category' }],
      });

      res.render('admin/adminProducts', {
        title: 'Admin - Productos',
        products,
      });
    } catch (error) {
      next(error);
    }
  },

async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, categoryId, description, showToClients, outStock } = req.body;

      const productData = {
        name,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        description,
        showToClients: showToClients === 'true',
        outStock: outStock === 'true',
        image: req.file ? req.file.filename : undefined,
      } as any;

      const product = await Product.create(productData);
      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  async adminOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await Order.findAll({
        include: [{ model: Product, as: 'products' }],
        order: [['createdAt', 'DESC']],
      });

      res.render('admin/adminOrders', {
        title: 'Admin - Ordenes',
        orders,
      });
    } catch (error) {
      next(error);
    }
  },
};
