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
          { model: ProductImage, as: 'images', limit: 1, order: [['order', 'ASC']] },
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
          { model: ProductImage, as: 'images', order: [['order', 'ASC']] },
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
        order: [['createdAt', 'DESC']],
      });

      const allProducts = await Product.findAll();
      const productsMap = new Map(allProducts.map((p) => [p.id, p]));

      const enrichedOrders = orders.map((order) => {
        const productIds = order.products.split(',');
        const orderProducts = productIds
          .map((id) => {
            const product = productsMap.get(parseInt(id));
            return product
              ? {
                  productId: product.id,
                  productName: product.name,
                  productPrice: product.price,
                }
              : null;
          })
          .filter((p) => p !== null);

        return {
          id: order.id,
          total: order.total,
          products: orderProducts,
          address: order.address,
          clientName: order.clientName,
          clientNotes: order.clientNotes,
          clientPhone: order.clientPhone,
          status: order.status,
          createdAt: order.createdAt,
        };
      });

      res.render('admin/adminOrders', {
        title: 'Admin - Ordenes',
        orders: enrichedOrders,
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
        deleted: false,
      };

      const product = await Product.create(productData);
      const files = Array.isArray(req.files) ? req.files : (req.files as any).images || [];
      const file1 = files[0];
      if (file1) {
        await ProductImage.create({
          productId: product.id,
          name: file1.originalname,
          file: file1.buffer.toString('base64'),
          order: 1,
        });
      }

      const file2 = files[1];
      if (file2) {
        await ProductImage.create({
          productId: product.id,
          name: file2.originalname,
          file: file2.buffer.toString('base64'),
          order: 2,
        });
      }

      const file3 = files[2];
      if (file3) {
        await ProductImage.create({
          productId: product.id,
          name: file3.originalname,
          file: file3.buffer.toString('base64'),
          order: 3,
        });
      }

      const file4 = files[3];
      if (file4) {
        await ProductImage.create({
          productId: product.id,
          name: file4.originalname,
          file: file4.buffer.toString('base64'),
          order: 4,
        });
      }

      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },







async editProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { name, price, categoryId, description, showToClients, outStock } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    await product.update({
      name,
      price: parseFloat(price),
      categoryId: parseInt(categoryId),
      description,
      showToClients: showToClients === 'true',
      outStock: outStock === 'true',
    });

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const allFiles = Object.values(files).flat();

    for (const file of allFiles) {
      // El nombre ya es "1","2","3","4"
      const order = Number(file.originalname);

      if (order >= 1 && order <= 4) {
        // Si recibo una imagen para ese slot, borro la vieja y guardo la nueva
        await ProductImage.destroy({ where: { productId: product.id, order } });

        await ProductImage.create({
          productId: product.id,
          name: String(order), // se guarda como "1","2","3","4"
          file: file.buffer.toString('base64'),
          order,
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
          { model: ProductImage, as: 'images', limit: 1, order: [['order', 'ASC']] },
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

      // Soft delete - mark as deleted instead of destroying
      await product.update({
        deleted: true,
      });

      res.json({ success: true, message: 'Producto eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  },

  async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { order } = req.body;

      if (!id || !order) {
        return res.status(400).json({ success: false, message: 'Faltan parámetros requeridos' });
      }

      const productId = parseInt(id);
      const orderNum = parseInt(order);

      if (orderNum < 1 || orderNum > 4) {
        return res.status(400).json({ success: false, message: 'El orden de la imagen debe estar entre 1 y 4' });
      }

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      }

      await ProductImage.destroy({ where: { productId, order: orderNum } });

      res.json({ success: true, message: 'Imagen eliminada correctamente' });
    } catch (error) {
      next(error);
    }
  },

  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, status } = req.body;

      if (!id || !status) {
        return res.status(400).json({ success: false, message: 'Faltan parámetros requeridos: id y status' });
      }

      const order = await Order.findByPk(parseInt(id));
      if (!order) {
        return res.status(404).json({ success: false, message: 'Orden no encontrada' });
      }

      await order.update({ status });

      res.json({ success: true, message: 'Orden actualizada correctamente', data: order });
    } catch (error) {
      next(error);
    }
  },
};
