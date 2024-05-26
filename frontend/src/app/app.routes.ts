import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductRegisterComponent } from './pages/product-register/product-register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'product-register', component: ProductRegisterComponent }
];