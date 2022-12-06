import { Request, Response } from 'express';
import ProductService from '../services/products.service';
import ValidateProduct from '../auth/validateProduct';

class ProductController {
  constructor(private productService = new ProductService()) {}

  public create = async (req: Request, res: Response) => {
    const product = req.body;

    const validateData = ValidateProduct.validationProduct(product);

    if (typeof validateData === 'string' && validateData.includes('required')) {
      return res.status(400).json({ message: validateData });
    }
    if (typeof validateData === 'string' && validateData.includes('must')) {
      return res.status(422).json({ message: validateData });
    }

    const productCreated = await this.productService.create(product);
    res.status(201).json(productCreated);
  };

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  };
}

export default ProductController;