import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { HomeController } from './controllers/homeController';

const app = express();

// Initialize Sequelize connection (non-blocking)
import sequelize from './config/db';

// Setup views
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

// Attempt to authenticate, but don't fail if DB is not available
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    // Ignore DB connection errors for development without DB
    console.log('Database not available (development mode)');
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

console.log('paso los middlewares');
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
console.log('paso los cors');
// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
console.log('paso los el api health');
// Server info
app.get('/_server', (req: Request, res: Response) => {
  res.json({
    port: process.env.PORT || 3001,
    url: `http://localhost:${process.env.PORT || 3001}`,
    timestamp: new Date().toISOString()
  });
});
console.log('paso los el api server info');

// API Routes
console.log('Importando routes');
import productRoutes from './routes/productRoutes';
import searchRoutes from './routes/searchRoutes';
import cartRoutes from './routes/cartRoutes';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';

console.log('Routes importados');

// Public Routes
app.use('/api/products', productRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
console.log('Routes registrados en app');
// Home Route
app.get('/', HomeController.home);
console.log('Home route registrado');

export default app;
