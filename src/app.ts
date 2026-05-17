import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { HomeController } from './controllers/homeController';
import multer from 'multer';
import session from 'express-session';

const app = express();

declare module 'express-session' {

  interface SessionData {

    cart: any[];

  }

}

// Initialize Sequelize connection (non-blocking)
import sequelize from './config/db';

// Setup views
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, '../src/views'),
  path.join(__dirname, '../src/views/admin'),
]);

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
app.use('/admin/js', express.static(path.join(__dirname, '../src/views/admin/js')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req: any, file: any, cb: any) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (validTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes JPG, PNG, GIF y WebP'));
    }
  },
});

// File upload route for create product
app.post('/upload-product', upload.single('image'), async (req: any, res: any, next: any) => {
  try {
    res.json({ success: true, file: req.file });
  } catch (error) {
    next(error);
  }
});

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
// Server info
app.get('/_server', (req: Request, res: Response) => {
  res.json({
    port: process.env.PORT || 3001,
    url: `http://localhost:${process.env.PORT || 3001}`,
    timestamp: new Date().toISOString()
  });
});

// API Routes
import productRoutes from './routes/productRoutes';
import searchRoutes from './routes/searchRoutes';
import cartRoutes from './routes/cartRoutes';
import adminRoutes from './routes/adminRoutes';

app.use(
  session({
    secret: 'gossip-secret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {

    res.locals.cart = req.session.cart || [];

    next();

});

// Public Routes
app.use('/api/products', productRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/cart', cartRoutes);
app.use('/admin', adminRoutes);

// View Routes
import homeRoutes from './routes/homeRoutes';
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use(homeRoutes);


// Home Route
app.get('/', HomeController.home);

export default app;
