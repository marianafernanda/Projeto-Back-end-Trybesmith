import { Request, Response } from 'express';
import UserService from '../services/users.service';
import GenerateJWT from '../auth/generateJWT';
import ValidateLogin from '../auth/validateLogin';

export default class LoginController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const user = req.body;

    const validateData = ValidateLogin.validationLogin(user);

    if (typeof validateData === 'string') {
      return res.status(400).json({ message: validateData });
    }

    const userUsername = await this.userService.getByUsername(user.username);
    const userPassword = await this.userService.getByPassword(user.password);

    if (!userUsername || userUsername.password !== user.password) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }
    if (userPassword.username !== user.username) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    const generateJWT = new GenerateJWT();

    const token = generateJWT.token(user);
    
    res.status(200).json({ token });
  };
}