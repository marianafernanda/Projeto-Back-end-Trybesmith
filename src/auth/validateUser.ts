import User from '../interfaces/user.interface';

const properties = ['username', 'password'];

export default class ValidateUser {
  static validateProperties(user: User): [boolean, string | null] {
    for (let i = 0; i < properties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
        return [false, properties[i]];
      }
    }
    return [true, null];
  }

  static validationUser(user: User): void | string {
    const [valid, property] = this.validateProperties(user);

    if (!valid) {
      return `"${property}" is required`;
    }
  }
}