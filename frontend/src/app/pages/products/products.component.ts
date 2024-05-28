import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  selectedCategory: string = 'Todos';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      this.products = await this.productService.getProducts();
      this.applyFilter();
    } catch (error) {
      console.error('Erro ao buscar os produtos: ', error);
    }
  }

  applyFilter(): void {
    if (this.selectedCategory === 'Todos') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (product) => product.category === this.selectedCategory
      );
      this.products.filter((product) => console.log(product.category));
    }
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilter();
  }

  async comprarProduto(product: IProduct): Promise<void> {
    if (product.stock > 0) {
      this.cartService.addToCart(product);
      product.stock -= 1;
      try {
        await this.productService.updateProduct(product.key!, product);
        alert(`${product.name} foi adicionado ao carrinho!`);
      } catch (error) {
        console.error('Erro ao atualizar o produto: ', error);
      }
    } else {
      alert('Produto fora de estoque!');
    }
  }

  showConfirmationMessage(message: string) {
    const confirmationMessage = document.createElement('div');
    confirmationMessage.className = 'confirmation-message';
    confirmationMessage.innerText = message;
    document.body.appendChild(confirmationMessage);

    setTimeout(() => {
      confirmationMessage.classList.add('show');
    }, 10);

    setTimeout(() => {
      confirmationMessage.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(confirmationMessage);
      }, 300);
    }, 3000);
  }
}
