import connection from '../models/connection';
import UserModel from '../models/users.model';
import User from '../interfaces/user.interface';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public create(user: User): Promise<User> {
    return this.model.create(user);
  }

  public async getByUsername(username: string): Promise<User> {
    const user = await this.model.getByUsername(username);
    return user;
  }

  public async getByPassword(password: string): Promise<User> {
    const user = await this.model.getByPassword(password);
    return user;
  }
}

export default UserService;