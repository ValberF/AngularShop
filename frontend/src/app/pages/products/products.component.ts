import { Component, OnInit, signal, WritableSignal } from '@angular/core';
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
  products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  filteredProducts: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
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
      const products = await this.productService.getProducts();
      this.products.set(products);
      this.applyFilter();
    } catch (error) {
      console.error('Erro ao buscar os produtos: ', error);
    }
  }

  applyFilter(): void {
    if (this.selectedCategory === 'Todos') {
      this.filteredProducts.set(this.products());
    } else {
      const filtered = this.products().filter(
        (product) => product.category === this.selectedCategory
      );
      this.filteredProducts.set(filtered);
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
        this.applyFilter();  // Reaplicar filtro após a atualização do estoque
      } catch (error) {
        console.error('Erro ao atualizar o produto: ', error);
      }
    } else {
      alert('Produto fora de estoque!');
    }
  }

  get filteredProductsList(): IProduct[] {
    return this.filteredProducts();
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
