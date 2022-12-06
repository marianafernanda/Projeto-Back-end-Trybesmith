import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/users.service';

const userService = new UserService();

const secret = String(process.env.JWT_SECRET);

type Decode = {
  id: number;
  username: string;
};

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret) as Decode;

    const user = await userService.getByUsername(decoded.username);

    req.body.user = decoded.username;

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  next();
};

export default validateToken;