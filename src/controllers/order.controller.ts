import { Request, Response } from 'express';
import OrderService from '../services/orders.service';
import UserService from '../services/users.service';

const userService = new UserService();

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds } = req.body;

    const userId = await userService.getIdByUsername(req.body.user);
    await this.orderService.create(productsIds, userId);
    res.status(201).json({ userId, productsIds });
  };
}

export default OrderController;