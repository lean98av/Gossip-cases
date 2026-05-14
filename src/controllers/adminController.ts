import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import Order from '../models/order';

export default {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await Product.findAll({
        include: [{ model: Product, as: 'category' }],
      });

      res.json({ success: true, data: products });
    } catch (error) {
      next(error);
    }
  },

  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await Order.findAll({
        include: [{ model: Product, as: 'products' }],
        order: [['createdAt', 'DESC']],
      });

      res.json({ success: true, data: orders });
    } catch (error) {
      next(error);
    }
  },
};
