import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import Order from '../models/order';
import Category from '../models/category';

export default {
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
      const { name, price, categoryId, description } = req.body;

      const product = await Product.create({
        name,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        description,
        showToClients: true,
        outStock: false,
        image: null,
      });

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
