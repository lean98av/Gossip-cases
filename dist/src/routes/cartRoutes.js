"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("../models/product"));
const router = (0, express_1.Router)();
router.post('/add/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const { cart } = req.cookies;
        if (!cart) {
            res.status(400).json({ success: false, message: 'Cookie cart no encontrada' });
            return;
        }
        const products = JSON.parse(cart);
        if (products.includes(productId)) {
            res.json({ success: false, message: 'Producto ya en carrito' });
            return;
        }
        const product = await product_1.default.findByPk(productId);
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error al añadir al carrito' });
    }
});
router.get('/', async (req, res) => {
    try {
        const cart = req.cookies.cart;
        if (!cart) {
            res.json({ success: true, data: [], count: 0 });
            return;
        }
        const productIds = JSON.parse(cart);
        const products = await product_1.default.findAll({
            where: {
                id: productIds,
                showToClients: true,
                outStock: false,
            },
            include: [{ model: product_1.default, as: 'category' }],
        });
        const validProductIds = productIds.filter((id) => products.some((p) => p.id === id));
        res.cookie('cart', JSON.stringify(validProductIds), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        res.json({ success: true, data: products, count: validProductIds.length });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener carrito' });
    }
});
exports.default = router;
//# sourceMappingURL=cartRoutes.js.map