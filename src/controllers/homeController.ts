import { Request, Response } from 'express';
import { Home } from '../models/home';

export class HomeController {
  static home(req: Request, res: Response) {
    const homeData = new Home({
      welcomeMessage: '¡Hola! Bienvenido a Gossip Cases',
      featuredProducts: [
        { id: 1, name: 'AirPods Pro', price: 249.00, image: 'airpods.png' },
        { id: 2, name: 'AirPods Max', price: 399.00, image: 'airpods.png' },
        { id: 3, name: 'AirPods 2', price: 99.00, image: 'airpods.png' },
      ],
      categories: [
        { id: 1, name: 'In-ear' },
        { id: 2, name: 'Earbuds' },
        { id: 3, name: 'On-ear' },
        { id: 4, name: 'Over-ear' },
      ],
      stats: {
        totalProducts: 1000,
        totalOrders: 5000,
        totalCustomers: 2500,
      },
      features: [
        { title: 'Rápido', description: 'Optimizado para el mejor rendimiento' },
        { title: 'Seguro', description: 'Protección de datos de primer nivel' },
        { title: 'Moderno', description: 'Diseño limpio y atractivo' },
      ],
    });

    res.render('home', { home: homeData });
  }
}
