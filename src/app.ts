import express from 'express';
import ProductController from './controllers/products.controller';
import UserController from './controllers/users.controller';
import OrderController from './controllers/order.controller';

const app = express();

app.use(express.json());

const productsController = new ProductController();
const usersController = new UserController();
const ordersController = new OrderController();

app.post('/products', productsController.create);
app.get('/products', productsController.getAll);
app.post('/users', usersController.create);
app.get('/orders', ordersController.getAll);

export default app;