import { Router, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import env from '../config/env';
import { Op } from 'sequelize';

const router = Router();

router.post('/login', async (req: { body: { email: string; password: string } }, res: Response) => {
  try {
    const { email, password } = (req as any).body;

    const user = await User.findOne({ where: { email } });

    if (!user || user.passwordHash !== password || user.isAdmin !== true) {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as any
    );

    res.json({ success: true, token, user: { id: user.id, email: user.email, isAdmin: user.isAdmin } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al autenticar' });
  }
});

export default router;
