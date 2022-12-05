import express from 'express';
import ProductController from './controllers/products.controller';

const app = express();

app.use(express.json());

const productsController = new ProductController();

app.post('/products', productsController.create);
app.get('/products', productsController.getAll);

export default app;