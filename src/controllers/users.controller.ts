import { Request, Response } from 'express';
import UserService from '../services/users.service';
import GenerateJWT from '../auth/generateJWT';

class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const userCreated = await this.userService.create(user);

    const generateJWT = new GenerateJWT();

    const token = generateJWT.token(userCreated);
    
    res.status(201).json({ token });
  };
}

export default UserController;