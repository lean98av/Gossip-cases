"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const homeController_1 = require("./controllers/homeController");
const app = (0, express_1.default)();
// Initialize Sequelize connection (non-blocking)
const db_1 = __importDefault(require("./config/db"));
// Setup views
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, '../views'));
// Attempt to authenticate, but don't fail if DB is not available
db_1.default.authenticate()
    .then(() => {
    console.log('Database connected');
})
    .catch((err) => {
    // Ignore DB connection errors for development without DB
    console.log('Database not available (development mode)');
});
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
console.log('paso los middlewares');
// CORS
app.use((req, res, next) => {
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
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
console.log('paso los el api health');
// Server info
app.get('/_server', (req, res) => {
    res.json({
        port: process.env.PORT || 3000,
        url: `http://localhost:${3000}`,
        timestamp: new Date().toISOString()
    });
});
console.log('paso los el api server info');
// API Routes
console.log('Importando routes');
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const searchRoutes_1 = __importDefault(require("./routes/searchRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
console.log('Routes importados');
// Public Routes
app.use('/api/products', productRoutes_1.default);
app.use('/api/search', searchRoutes_1.default);
app.use('/api/cart', cartRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
console.log('Routes registrados en app');
// Home Route
app.get('/', homeController_1.HomeController.home);
console.log('Home route registrado');
exports.default = app;
//# sourceMappingURL=app.js.map