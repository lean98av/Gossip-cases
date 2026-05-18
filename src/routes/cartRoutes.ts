import { Router } from 'express';
import Product from '../models/product';
import { Category, ProductImage } from '../models';

const router = Router();

/* =========================
   VER CARRITO
========================= */

router.get('/', async (req: any, res) => {

  const cart = req.session.cart || [];

  let total = 0;

  cart.forEach((item: any) => {
    total += item.price * item.quantity;
  });

  res.render('cart', {
    title: 'Carrito',
    cart,
    total
  });
});

/* =========================
   AGREGAR PRODUCTO
========================= */

router.post('/add/:id', async (req: any, res) => {

  const product = await Product.findOne({
        where: { id: req.params.id, deleted: false },
        include: [
          { model: Category, as: 'category' },
          { model: ProductImage, as: 'images', order: [['order', 'ASC']] },
        ],
      })

        const productImage = await ProductImage.findOne({
          where: { productId: product?.id, order: 1 },
        })

  if (!product) {
    return res.redirect('/');
  }

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existing = req.session.cart.find(
    (item: any) => item.id === product.id
  );

  if (existing) {

    existing.quantity++;

  } else {
    req.session.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: productImage ,
      quantity: 1
    });

  }

  res.redirect('/cart');
});

/* =========================
   ELIMINAR
========================= */

router.post('/remove/:id', (req: any, res) => {

  req.session.cart = req.session.cart.filter(
    (item: any) => item.id != req.params.id
  );

  res.redirect('/cart');
});

export default router;