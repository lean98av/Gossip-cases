import { Request, Response, NextFunction } from 'express';
import { Response as ExpressResponse } from 'express';

declare global {
  namespace Express {
    interface Request {
      adminAuth?: boolean;
    }
  }
}

// Middleware para crear cookie de autenticación
export const setAdminAuthCookie = (req: Request, res: Response, cookieValue: string) => {
  res.cookie('adminAuth', cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    sameSite: 'strict',
  });
};

// Middleware de autenticación para rutas protegidas del admin
// Para la ruta de login, permite sin cookie previa
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const authCookie = req.cookies?.adminAuth;
  const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

  if (!authCookie || authCookie !== ADMIN_PASS) {
    if (authCookie && authCookie !== ADMIN_PASS) {
      res.clearCookie('adminAuth', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    }
    return res.redirect('/admin/login');
  }

  req.adminAuth = true;
  next();
};

// Middleware para eliminar cookie de autenticación (logout)
export const clearAdminAuthCookie = (req: Request, res: Response) => {
  res.cookie('adminAuth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    sameSite: 'strict',
  });
};
