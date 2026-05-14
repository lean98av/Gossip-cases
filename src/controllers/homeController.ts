import { Request, Response } from 'express';

export class HomeController {
  static home(req: Request, res: Response) {
    res.send('Hello World');
  }
}
