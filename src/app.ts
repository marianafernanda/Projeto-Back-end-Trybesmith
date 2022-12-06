import express from 'express';
import ProductController from './controllers/products.controller';
import UserController from './controllers/users.controller';
import OrderController from './controllers/order.controller';
import LoginController from './controllers/login.controller';
import validateUser from './middlewares/validateUser';

const app = express();

app.use(express.json());

const productsController = new ProductController();
const usersController = new UserController();
const ordersController = new OrderController();
const loginController = new LoginController();

app.post('/products', productsController.create);
app.get('/products', productsController.getAll);
app.post('/users', validateUser, usersController.create);
app.get('/orders', ordersController.getAll);
app.post('/login', loginController.login);

export default app;