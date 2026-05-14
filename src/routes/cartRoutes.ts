import { Router, Response, NextFunction } from 'express';
import Product from '../models/product';
import { Request } from 'express';

const router = Router();

router.post('/add/:id', async (req: Request, res: Response) => {
  try {
    const productId = parseInt((req as any).params.id, 10);
    const { cart } = (req as any).cookies;

    if (!cart) {
      res.status(400).json({ success: false, message: 'Cookie cart no encontrada' });
      return;
    }

    const products = JSON.parse(cart);

    if (products.includes(productId)) {
      res.json({ success: false, message: 'Producto ya en carrito' });
      return;
    }

    const product = await Product.findByPk(productId);
    if (!product || product.outStock || product.showToClients === false) {
      res.status(400).json({ success: false, message: 'Producto no disponible' });
      return;
    }

    const updatedCart = [...products, productId];
    res.cookie('cart', JSON.stringify(updatedCart), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.json({ success: true, message: 'Producto añadido al carrito', cart: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al añadir al carrito' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const cart = (req as any).cookies.cart;
    if (!cart) {
      res.json({ success: true, data: [], count: 0 });
      return;
    }

    const productIds = JSON.parse(cart);
    const products = await Product.findAll({
      where: {
        id: productIds,
        showToClients: true,
        outStock: false,
      },
      include: [{ model: Product, as: 'category' }],
    });

    const validProductIds = productIds.filter((id: number) => products.some((p) => p.id === id));

    res.cookie('cart', JSON.stringify(validProductIds), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.json({ success: true, data: products, count: validProductIds.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener carrito' });
  }
});

export default router;
