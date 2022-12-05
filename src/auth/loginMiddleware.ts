import { Request, Response, NextFunction } from 'express';
import UserService from '../services/users.service';

export default class LoginMiddleware {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const userUsername = await this.userService.getByUsername(user.username);
    const userPassword = await this.userService.getByPassword(user.password);

    if (userUsername.password !== user.password || !userUsername) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }
    if (userPassword.username !== user.username || !userPassword) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    next();
  };
}