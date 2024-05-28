import { Component } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private authService: AuthService, private cartService: CartService) {}

  logout() {
    this.authService.logout();
    alert("Deslogando...")
  }

}
