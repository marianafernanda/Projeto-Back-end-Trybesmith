import { sign } from 'jsonwebtoken';
import User from '../interfaces/user.interface';

export default class GenerateJWT {
  secret: string;

  constructor() {
    this.secret = String(process.env.JWT_SECRET);
  }

  public token(user: User): string {
    const payload = { id: user.id, username: user.username };
    const token = sign(payload, this.secret);
    return token;
  }
}