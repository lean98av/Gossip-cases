import { Request, Response } from 'express';
import Category from '../models/category';
import Product from '../models/product';

export default {
  home(req: Request, res: Response) {
    const categories = [
      { id: 1, name: 'Catálogo exclusivo', description: 'Colección especial de productos seleccionados' },
      { id: 2, name: 'Catálogo Fundas iP.', description: 'Fundas y protectores para iPad y dispositivos' },
      { id: 3, name: 'Gossip Cases AirPods', description: 'Fundas premium para AirPods y AirPods Pro' },
      { id: 4, name: 'Gossip Cases cargadores', description: 'Casas y fundas para cargadores y power banks' },
    ];

    res.render('home', {
      home: {
        welcomeMessage: '¡Hola! Bienvenido a Gossip Cases',
        featuredProducts: [
          { id: 1, name: 'AirPods Pro', price: 249.00, image: 'airpods.png' },
          { id: 2, name: 'AirPods Max', price: 399.00, image: 'airpods.png' },
          { id: 3, name: 'AirPods 2', price: 99.00, image: 'airpods.png' },
        ],
        categories,
        stats: {
          totalProducts: 1000,
          totalOrders: 5000,
          totalCustomers: 2500,
        },
        features: [
          { title: 'Rápido', description: 'Optimizado para el mejor rendimiento' },
          { title: 'Seguro', description: 'Protección de datos de primer nivel' },
          { title: 'Moderno', description: 'Diseño limpio y atractivo' },
        ],
      },
    });
  },

  async getCatalogoExclusivo(req: Request, res: Response) {
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

      res.render('category', {
        category: { ...category, products },
        title: 'Catálogo exclusivo',
      });
    } catch (error) {
      console.error('Error en getCatalogoExclusivo:', error);
      res.status(500).json({ success: false, error: 'Error al obtener productos' });
    }
  },

  async getCatalogoFundasIP(req: Request, res: Response) {
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

      res.render('category', {
        category: { ...category, products },
        title: 'Catálogo Fundas iP.',
      });
    } catch (error) {
      console.error('Error en getCatalogoFundasIP:', error);
      res.status(500).json({ success: false, error: 'Error al obtener productos' });
    }
  },

  async getGossipCasesAirPods(req: Request, res: Response) {
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

      res.render('category', {
        category: { ...category, products },
        title: 'Gossip Cases AirPods',
      });
    } catch (error) {
      console.error('Error en getGossipCasesAirPods:', error);
      res.status(500).json({ success: false, error: 'Error al obtener productos' });
    }
  },

  async getGossipCasesCargadores(req: Request, res: Response) {
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

      res.render('category', {
        category: { ...category, products },
        title: 'Gossip Cases cargadores',
      });
    } catch (error) {
      console.error('Error en getGossipCasesCargadores:', error);
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

      res.render('category', {
        category: {
          id: 5,
          name: 'Stock disponible',
          description: 'Productos con stock disponible para envío inmediato',
          products,
        },
        title: 'Stock disponible',
      });
    } catch (error) {
      console.error('Error en getStockDiponible:', error);
      res.status(500).json({ success: false, error: 'Error al obtener productos' });
    }
  },
};
