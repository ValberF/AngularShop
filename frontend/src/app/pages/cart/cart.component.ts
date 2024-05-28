import { ICart } from './../../models/cart.model';
import { Component, OnInit } from '@angular/core';
import { CartService, ICartProduct } from '../../services/cart.service';
import { IProduct } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart: ICartProduct[] = [];
  cartFinished!: {};
  user: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  finalizarPedido(): void {
    if (this.cart.length > 0 || localStorage.getItem('userData')) {
      const userDataString = localStorage.getItem('userData');
      if (userDataString !== null) {
        this.user = JSON.parse(userDataString);
      } else {
        this.user = null;
      }
      this.cartFinished = {
        cart: this.cart,
        user: this.user,
      };
      this.cartService.createCart(this.cartFinished);
      alert('Pedido finalizado com sucesso!');
      console.log(this.cartFinished);
      this.cartService.clearCart();
      this.cart = [];
    } else {
      alert('O carrinho está vazio ou não existe usuário logado!');
    }
  }

  removerProduto(product: IProduct): void {
    this.cartService.removeProduct(product);
    this.cart = this.cartService.getCart();
  }
}
