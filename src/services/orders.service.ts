import connection from '../models/connection';
import OrderModel from '../models/orders.model';
import ProductModel from '../models/products.model';
import Order from '../interfaces/order.interface';

class OrderService {
  public model: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  public async create(productsId: number[], userId: number) {
    const orderId = await this.model.create(userId);
    const register = productsId.map((product) =>
      this.productModel.update(orderId, product));
    await Promise.all(register);
  }
}

export default OrderService;