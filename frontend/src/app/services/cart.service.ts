import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';


export interface ICartProduct extends IProduct {
  quantity: number;
}
@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: ICartProduct[] = [];

  addToCart(product: IProduct) {
    const cartProduct = this.cart.find(p => p.key === product.key);
    if (cartProduct) {
      cartProduct.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
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
