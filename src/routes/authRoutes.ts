import { Router, Response, NextFunction } from 'express';
import User from '../models/user';

const router = Router();

// Autenticación simple por URL
// Solo permite acceso a usuarios administradores
router.post('/login', async (req: { body: { email: string; password: string } }, res: Response) => {
  try {
    const { email, password } = (req as any).body;

    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });

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
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al autenticar' });
  }
});

// Verificar autenticación por parámetro en URL
// Solo permite acceso a usuarios administradores
router.get('/verify', async (req: { query: { pass?: string } }, res: Response) => {
  try {
    const pass = (req as any).query?.pass;
    const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

    if (pass !== ADMIN_PASS) {
      res.status(401).json({ success: false, message: 'Acceso denegado' });
      return;
    }

    // Buscar usuario administrador
    const user = await User.findOne({ where: { isAdmin: true } });

    if (!user) {
      res.status(401).json({ success: false, message: 'Usuario administrador no encontrado' });
      return;
    }

    res.json({ success: true, user: { id: user.id, email: user.email, isAdmin: user.isAdmin } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al verificar autenticación' });
  }
});

export default router;
