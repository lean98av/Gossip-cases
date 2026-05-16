import { Request, Response } from 'express';
import Category from '../models/category';
import Product from '../models/product';

export default {
  async getCargadores(req: Request, res: Response) {
    try {
      const category = await Category.findByPk(1);
      if (!category) {
        return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
      }
      const products = await Product.findAll({
        where: {
          categoryId: 1,
          showToClients: true,
        },
        order: [['createdAt', 'DESC']],
      });

      res.render('cargadores', {
        category,
        products,
        title: 'Gossip Cases cargadores',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        stack: error.stack
      });
    }
  },

  async getAirPods(req: Request, res: Response) {
    try {
      const category = await Category.findByPk(2);
      if (!category) {
        return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
      }
      const products = await Product.findAll({
        where: {
          categoryId: 2,
          showToClients: true,
        },
        order: [['createdAt', 'DESC']],
      });

       res.render('airpods', {
        category,
        products,
        title: 'Gossip Cases Airpods',
      });
    } catch (error) {
      console.error('Error en getGossipCasesAirPods:', error);
      res.status(500).json({ success: false, error: 'Error al obtener productos' });
    }
  },

  async getFundas(req: Request, res: Response) {
    try {
      const category = await Category.findByPk(3);
      if (!category) {
        return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
      }
      const products = await Product.findAll({
        where: {
          categoryId: 3,
          showToClients: true,
        },
        order: [['createdAt', 'DESC']],
      });

       res.render('fundas', {
        category,
        products,
        title: 'Gossip Cases fundas',
      });
    } catch (error) {
      console.error('Error en getCatalogoFundasIP:', error);
      res.status(500).json({ success: false, error: 'Error al obtener productos' });
    }
  },

  async getCatalogoExclusivo(req: Request, res: Response) {
    try {
      const category = await Category.findByPk(4);
      if (!category) {
        return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
      }
      const products = await Product.findAll({
        where: {
          categoryId: 4,
          showToClients: true,
        },
        order: [['createdAt', 'DESC']],
      });

       res.render('gossip-exclusive', {
        category,
        products,
        title: 'Gossip Cases exclusive',
      });
    } catch (error) {
      console.error('Error en getCatalogoExclusivo:', error);
      res.status(500).json({ success: false, error: 'Error al obtener productos' });
    }
  },

  async getStockDiponible(req: Request, res: Response) {
    try {
      const products = await Product.findAll({
        where: {
          showToClients: true,
          outStock: false,
        },
        include: [{ model: Category, as: 'category' }],
        order: [['createdAt', 'DESC']],
      });

      res.render('categorySimple', {
        category: {
          id: 5,
          name: 'stock disponible',
          description: 'Productos con stock disponible para envío inmediato',
          products,
        },
        title: 'stock disponible',
      });
    } catch (error) {
      console.error('Error en getStockDiponible:', error);
      res.status(500).json({ success: false, error: 'Error al obtener productos' });
    }
  },
};
