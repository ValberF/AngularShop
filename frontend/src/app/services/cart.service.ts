import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: IProduct[] = [];

  addToCart(product: IProduct) {
    this.cart.push(product);
    console.log(`${product.name} foi adicionado ao carrinho.`);
  }

  getCart() {
    return this.cart;
  }
}
