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
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: ICartProduct[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  finalizarPedido(): void {
    if (this.cart.length > 0) {
      alert('Pedido finalizado com sucesso!');
      this.cartService.clearCart();
      this.cart = [];
    } else {
      alert('O carrinho está vazio!');
    }
  }

  removerProduto(product: IProduct): void {
    this.cartService.removeProduct(product);
    this.cart = this.cartService.getCart();
  }
}
