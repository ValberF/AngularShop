import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductRegisterComponent } from './pages/product-register/product-register.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'product-register', component: ProductRegisterComponent },
    { path: 'products', component: ProductsComponent },
    { path : 'cart', component: CartComponent }

];
