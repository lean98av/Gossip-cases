import { Router } from 'express';
import CategoriesProductsController from '../controllers/CategoriesProductsController';

const router = Router();

// Home route
router.get('/', CategoriesProductsController.home);

// Category routes
router.get('/gossip-cases-cargadores', CategoriesProductsController.getGossipCasesCargadores);
router.get('/gossip-cases-airpods', CategoriesProductsController.getGossipCasesAirPods);
router.get('/catalogo-fundas-ip', CategoriesProductsController.getCatalogoFundasIP);
router.get('/catalogo-exclusivo', CategoriesProductsController.getCatalogoExclusivo);
router.get('/stock-diponible', CategoriesProductsController.getStockDiponible);

export default router;
