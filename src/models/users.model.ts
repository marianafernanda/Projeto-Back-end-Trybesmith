import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import User from '../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }

  public async getByUsername(username: string): Promise<User> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users WHERE username=?;', [username]);
    const [rows] = result;
    const [book] = rows as User[];
    return book;
  }

  public async getByPassword(password: string): Promise<User> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users WHERE password=?;', [password]);
    const [rows] = result;
    const [book] = rows as User[];
    return book;
  }

  public async getIdByUsername(username: string): Promise<number> {
    const [[{ id }]] = await this.connection.execute<RowDataPacket[]>(
      'SELECT id FROM Trybesmith.Users WHERE username =?',
      [username],
    );
    return Number(id);
  }
}