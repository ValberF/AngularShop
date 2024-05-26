import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.scss'
})
export class ProductRegisterComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

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

  }
}
