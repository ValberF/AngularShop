// app.routes.ts
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductRegisterComponent } from './pages/product-register/product-register.component';
import { AuthGuard } from '../app/guard/auth.guard';
import { OrdersComponent } from './pages/orders/orders.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path : 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'orders/:id', component: OrdersComponent },
  { 
    path: 'product-register', 
    component: ProductRegisterComponent,
    canActivate: [AuthGuard]
  }
];
