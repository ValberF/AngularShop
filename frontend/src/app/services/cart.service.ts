import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ICart } from '../models/cart.model';
import { Database, get, push, ref, set } from '@angular/fire/database';


export interface ICartProduct extends IProduct {
  quantity: number;
}
@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: ICartProduct[] = [];
  private dbCartsPath = '/carts';

  constructor(private db: Database) {}

  addToCart(product: IProduct) {
    const cartProduct = this.cart.find(p => p.key === product.key);
    if (cartProduct) {
      cartProduct.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  async createCart(cart: any): Promise<void> {
    const cartRef = ref(this.db, this.dbCartsPath);
    const newCartRef = push(cartRef);
    return set(newCartRef, cart);
  }

  async getCartsByUser(userId: string): Promise<ICart[]> {
    const cartRef = ref(this.db, this.dbCartsPath);
    const snapshot = await get(cartRef);
    if (snapshot.exists()) {
      const carts: any = [];
      snapshot.forEach((childSnapshot) => {
        const cart = childSnapshot.val() as ICart;
        if (cart.user && cart.user.id === userId) {
          carts.push({ key: childSnapshot.key, ...cart });
        }
      });
      return carts;
    } else {
      return [];
    }
  }

  getCart(): ICartProduct[] {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }

  removeProduct(product: IProduct) {
    const index = this.cart.findIndex(p => p.key === product.key);
    if (index !== -1) {
      this.cart[index].quantity--;
      if (this.cart[index].quantity === 0) {
        this.cart.splice(index, 1);
      }
    }
  }
}
