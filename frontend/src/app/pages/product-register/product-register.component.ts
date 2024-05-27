import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.scss',
})
export class ProductRegisterComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
      stock: ['', Validators.required],
    });
  }

  addSuino(): void {
    if (this.form.valid) {
      const product: IProduct = this.form.value;

      this.productService
        .createProduct(product)
        .then(() => {
          console.log('Produto salvo com sucesso!');
          this.router.navigate(['/products']);
        })
        .catch((error) => {
          console.error('Erro ao salvar o produto: ', error);
        });
    } else {
      console.error('Formulário inválido');
    }
  }
}
