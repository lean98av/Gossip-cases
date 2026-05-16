import { Request, Response, NextFunction } from 'express';
import Product, { ProductAttributes } from '../models/product';
import sequelize from '../config/db';
import { Category } from '../models';

export default {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { showToClients = true } = req.query;

      const products = await Product.findAndCountAll({
        where: {
          ...(showToClients === 'false' && { showToClients: false }),
        },
        include: [{ model: Product, as: 'category' }],
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
        include: [{ model: Product, as: 'category' }],
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

  async getProductDetailPage(req: Request, res: Response, next: NextFunction) {

    try {

      const product = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Category,
            as: 'category'
          }
        ]
      });

      if (!product) {
        return res.status(404).render('404');
      }

      res.render('details', {
        product,
        title: product.name
      });

    } catch (error) {

      next(error);

    }
  }
};
