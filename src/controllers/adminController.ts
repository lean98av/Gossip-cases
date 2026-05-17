import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import ProductImage from '../models/productImage';
import Order from '../models/order';
import Category from '../models/category';
import multer from 'multer';
import path from 'path';
import { setAdminAuthCookie, clearAdminAuthCookie } from '../middleware/authMiddleware';

export default {
  upload: multer({
    storage: multer.memoryStorage(),
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

  // Métodos que retornan vistas

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('que pasa con el auth:', req.body);
      const { pass } = req.body;
      const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

      if (pass === ADMIN_PASS) {
        setAdminAuthCookie(req, res, ADMIN_PASS);
        return res.redirect('/admin');
      }

      res.status(401).render('admin/adminHome', {
        title: 'Admin Panel - Gossip Cases',
        adminAuth: false,
        error: 'Contraseña incorrecta',
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      clearAdminAuthCookie(req, res);
      return res.redirect('/admin/login');
    } catch (error) {
      next(error);
    }
  },

  async home(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Admin auth status in home controller:", req.adminAuth);
      res.render('admin/adminHome', {
        title: 'Admin Panel - Gossip Cases',
        adminAuth: req.adminAuth,
      });
    } catch (error) {
      next(error);
    }
  },

  async adminProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await Product.findAll({
        include: [
          { model: Category, as: 'category' },
          { model: ProductImage, as: 'images' },
        ],
      });

      const categories = await Category.findAll();

      res.render('admin/adminProducts', {
        title: 'Admin - Productos',
        products,
        categories,
        adminAuth: req.adminAuth,
      });
    } catch (error) {
      next(error);
    }
  },

  async getEditProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          { model: Category, as: 'category' },
          { model: ProductImage, as: 'images' },
        ],
      });

      if (!product) {
        res.status(404).json({ success: false, message: 'Producto no encontrado' });
        return;
      }

      const categories = await Category.findAll();

      res.render('admin/createEditProduct', {
        title: 'Edit Product',
        product,
        categories,
        adminAuth: req.adminAuth,
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
        adminAuth: req.adminAuth,
      });
    } catch (error) {
      next(error);
    }
  },

  // Métodos que retornan JSON

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
      };

      const product = await Product.create(productData);

      // Create image records if files were uploaded
      if (req.files && (req.files as any).images && (req.files as any).images.length > 0) {
        const files = (req.files as any).images;
        for (let i = 0; i < files.length; i++) {
          await ProductImage.create({
            productId: product.id,
            name: files[i].originalname,
            file: files[i].buffer.toString('base64'),
          });
        }
      }

      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  async editProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, price, categoryId, description, showToClients, outStock, deleteImages } = req.body;

      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ success: false, message: 'Producto no encontrado' });
        return;
      }

      // Update product data
      await product.update({
        name,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        description,
        showToClients: showToClients === 'true',
        outStock: outStock === 'true',
      });

      // Delete images if specified
      if (deleteImages && Array.isArray(deleteImages)) {
        await ProductImage.destroy({
          where: {
            id: deleteImages,
            productId: id,
          },
        });
      }

      // Add new images if uploaded
      if (req.files && (req.files as any).images && (req.files as any).images.length > 0) {
        const files = (req.files as any).images;
        for (let i = 0; i < files.length; i++) {
          await ProductImage.create({
            productId: product.id,
            name: files[i].originalname,
            file: files[i].buffer.toString('base64'),
          });
        }
      }

      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          { model: Category, as: 'category' },
          { model: ProductImage, as: 'images' },
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

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        res.status(404).json({ success: false, message: 'Producto no encontrado' });
        return;
      }

      // Delete associated images
      await ProductImage.destroy({
        where: { productId: id },
      });

      // Delete product
      await product.destroy();

      res.json({ success: true, message: 'Producto eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  },
};
