"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("../models/product"));
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const { q = '' } = req.query;
        const search = q.toLowerCase();
        const products = await product_1.default.findAll({
            where: {
                showToClients: true,
                ...(search && {
                    [sequelize_1.Op.or]: [
                        { name: { [sequelize_1.Op.iLike]: `%${search}%` } },
                        { description: { [sequelize_1.Op.iLike]: `%${search}%` } },
                    ],
                }),
            },
            include: [{ model: product_1.default, as: 'category' }],
        });
        res.json({ success: true, data: products });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error en la búsqueda' });
    }
});
exports.default = router;
//# sourceMappingURL=searchRoutes.js.map