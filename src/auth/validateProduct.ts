import Product from '../interfaces/product.interface';

const properties = ['name', 'amount'];

export default class ValidateProduct {
  static validateProperties(product: Product): [boolean, string | null] {
    for (let i = 0; i < properties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(product, properties[i])) {
        return [false, properties[i]];
      }
    }
    return [true, null];
  }

  static validateValues(product: Product): [boolean, string | null] {
    const entries = Object.entries(product);
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];
      if (value.length < 3) {
        return [false, property];
      }
    }
    return [true, null];
  }

  static validateType(product: Product): [boolean, string | null] {
    const entries = Object.entries(product);
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];
      if (typeof value !== 'string') {
        return [false, property];
      }
    }
    return [true, null];
  }

  static validationProduct(product: Product): void | string {
    let [valid, property] = this.validateProperties(product);

    if (!valid) {
      return `"${property}" is required`;
    }

    [valid, property] = this.validateValues(product);

    if (!valid) {
      return `"${property}" length must be at least 3 characters long`;
    }

    [valid, property] = this.validateType(product);

    if (!valid) {
      return `"${property}" must be a string`;
    }
  }
}