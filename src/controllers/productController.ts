import { Request, Response, NextFunction } from 'express';
import Product, { ProductAttributes } from '../models/product';
import ProductImage from '../models/productImage';
import sequelize from '../config/db';

export default {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { showToClients = true } = req.query;

      const products = await Product.findAndCountAll({
        where: {
          ...(showToClients === 'false' && { showToClients: false }),
        },
        include: [
          { model: Product, as: 'category' },
          {
            model: ProductImage,
            as: 'images',
            attributes: ['id', 'name', 'file'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      res.json({
        success: true,
        data: products.rows,
        count: products.count,
      });
    } catch (error) {
      next(error);
    }
  },

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          { model: Product, as: 'category' },
          {
            model: ProductImage,
            as: 'images',
            attributes: ['id', 'name', 'file'],
          },
        ],
      });

      if (!product) {
        res.status(404).json({ success: false, message: 'Producto no encontrado' });
        return;
      }

      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },
};
