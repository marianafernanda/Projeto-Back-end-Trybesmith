import { sign } from 'jsonwebtoken';
import User from '../interfaces/user.interface';

export default class GenerateJWT {
  secret: string;

  constructor() {
    this.secret = String(process.env.JWT_SECRET);
  }

  public token(user: User): string {
    const token = sign({ data: { userId: user.id } }, this.secret);
    return token;
  }
}