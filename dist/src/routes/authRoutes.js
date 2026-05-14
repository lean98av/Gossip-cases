"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
// Autenticación simple por URL
// Solo permite acceso a usuarios administradores
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Buscar usuario por email
        const user = await user_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ success: false, message: 'Usuario no encontrado' });
            return;
        }
        // Verificar contraseña y que sea administrador
        if (user.passwordHash !== password || user.isAdmin !== true) {
            res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            return;
        }
        // Devolver datos (autenticación simple por URL)
        res.json({ success: true, user: { id: user.id, email: user.email, isAdmin: user.isAdmin } });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error al autenticar' });
    }
});
// Verificar autenticación por parámetro en URL
// Solo permite acceso a usuarios administradores
router.get('/verify', async (req, res) => {
    try {
        const pass = req.query?.pass;
        const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
        if (pass !== ADMIN_PASS) {
            res.status(401).json({ success: false, message: 'Acceso denegado' });
            return;
        }
        // Buscar usuario administrador
        const user = await user_1.default.findOne({ where: { isAdmin: true } });
        if (!user) {
            res.status(401).json({ success: false, message: 'Usuario administrador no encontrado' });
            return;
        }
        res.json({ success: true, user: { id: user.id, email: user.email, isAdmin: user.isAdmin } });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error al verificar autenticación' });
    }
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map