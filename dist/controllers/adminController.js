"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
const order_1 = __importDefault(require("../models/order"));
exports.default = {
    async getAllProducts(req, res, next) {
        try {
            const products = await product_1.default.findAll({
                include: [{ model: product_1.default, as: 'category' }],
            });
            res.json({ success: true, data: products });
        }
        catch (error) {
            next(error);
        }
    },
    async getAllOrders(req, res, next) {
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
    },
};
//# sourceMappingURL=adminController.js.map