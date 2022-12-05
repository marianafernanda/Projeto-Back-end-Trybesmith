import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `SELECT orders.id, orders.userId, JSON_ARRAYAGG(products.id) AS productsIds
      FROM Trybesmith.Orders AS orders
      INNER JOIN Trybesmith.Products AS products
      ON orders.id = products.orderId
      GROUP BY orders.id`,
    );
    const [row] = result;
    return row as Order[];
  }
}