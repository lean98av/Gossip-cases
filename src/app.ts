import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

import path from 'path';

const app = express();

// Initialize Sequelize connection
import sequelize from './config/db';

sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
}).catch((err) => {
  console.error('Database connection error:', err);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
import productRoutes from './routes/productRoutes';
import searchRoutes from './routes/searchRoutes';
import cartRoutes from './routes/cartRoutes';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';

// Public Routes
app.use('/api/products', productRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);

// Admin Routes (protegidas con pass en URL)
app.use('/api/admin', adminRoutes);

export default app;
