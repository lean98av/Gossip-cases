import { Router } from 'express';
import CategoriesProductsController from '../controllers/CategoriesProductsController';
import { HomeController } from '../controllers';

const router = Router();

// Home route
router.get('/', HomeController.home);

// Category routes
router.get('/cargadores', CategoriesProductsController.getCargadores);
router.get('/airpods', CategoriesProductsController.getAirPods);
router.get('/fundas', CategoriesProductsController.getFundas);
router.get('/gossip-exclusive', CategoriesProductsController.getCatalogoExclusivo);
router.get('/stock-disponible', CategoriesProductsController.getStockDiponible);

export default router;
