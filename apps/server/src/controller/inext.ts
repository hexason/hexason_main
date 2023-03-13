import { AdminController } from './admin.controller';
import { BookController } from './book.controller';
import { ConfigController } from './config.controller';
import { ProductController } from './product.controller';
import { UserController } from './user.controller';

export const controllers = [
  ProductController,
  UserController,
  AdminController,
  ConfigController,
  BookController,
];
