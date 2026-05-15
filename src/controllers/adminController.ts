import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import Order from '../models/order';

export default {
  async home(req: Request, res: Response, next: NextFunction) {
    try {
      res.render('admin/home', {
        title: 'Admin Panel - Gossip Cases',
      });
    } catch (error) {
      next(error);
    }
  },

  async adminProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await Product.findAll({
        include: [{ model: Product, as: 'category' }],
      });

      res.render('admin/adminProducts', {
        title: 'Admin - Productos',
        products,
      });
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
