"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
exports.default = {
    async getAllProducts(req, res, next) {
        try {
            const { showToClients = true } = req.query;
            const products = await product_1.default.findAndCountAll({
                where: {
                    ...(showToClients === 'false' && { showToClients: false }),
                },
                include: [{ model: product_1.default, as: 'category' }],
                order: [['createdAt', 'DESC']],
            });
            res.json({
                success: true,
                data: products.rows,
                count: products.count,
            });
        }
        catch (error) {
            next(error);
        }
    },
    async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await product_1.default.findByPk(id, {
                include: [{ model: product_1.default, as: 'category' }],
            });
            if (!product) {
                res.status(404).json({ success: false, message: 'Producto no encontrado' });
                return;
            }
            res.json({ success: true, data: product });
        }
        catch (error) {
            next(error);
        }
    },
};
//# sourceMappingURL=productController.js.map