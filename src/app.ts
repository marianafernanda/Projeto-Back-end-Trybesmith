import express from 'express';
import ProductController from './controllers/products.controller';
import UserController from './controllers/users.controller';

const app = express();

app.use(express.json());

const productsController = new ProductController();
const usersController = new UserController();

app.post('/products', productsController.create);
app.get('/products', productsController.getAll);
app.post('/users', usersController.create);

export default app;