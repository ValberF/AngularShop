import { IProduct } from "./product.model";
import { IUser } from "./user.model";

export interface ICart {
  products: IProduct[]
  user: IUser
}
