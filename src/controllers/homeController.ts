import { Request, Response } from 'express';
import { Home } from '../models/home';

export class HomeController {
  static home(req: Request, res: Response) {
    res.render('home');
  }
}
