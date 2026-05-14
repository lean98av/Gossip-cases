"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("../models/product"));
const order_1 = __importDefault(require("../models/order"));
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    const pass = req.query?.pass;
    const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
    if (pass !== ADMIN_PASS) {
        res.status(401).json({ success: false, message: 'Acceso denegado' });
        return;
    }
    next();
});
router.get('/products', async (req, res, next) => {
    try {
        const products = await product_1.default.findAll({
            include: [{ model: product_1.default, as: 'category' }],
        });
        res.json({ success: true, data: products });
    }
    catch (error) {
        next(error);
    }
});
router.get('/orders', async (req, res, next) => {
    try {
        const orders = await order_1.default.findAll({
            include: [{ model: product_1.default, as: 'products' }],
            order: [['createdAt', 'DESC']],
        });
        res.json({ success: true, data: orders });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map