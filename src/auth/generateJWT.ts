import { sign } from 'jsonwebtoken';
import User from '../interfaces/user.interface';

// export const auth = {
//   secret: String(process.env.JWT_SECRET),
//   algorithm: String('HS256'),
// };

export default class GenerateJWT {
  expiresIn: string;

  secret: string;

  constructor() {
    this.secret = String(process.env.JWT_SECRET);
    this.expiresIn = String('1h');
  }

  public token(user: User): string {
    const token = sign({ data: { userId: user.id } }, this.secret);
    return token;
  }
}