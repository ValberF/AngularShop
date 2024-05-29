import { Component, OnInit } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  id!: string;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {

  }

  orders() {
    const storage = localStorage.getItem("userData");
    if (storage !== null) {
      const userData = JSON.parse(storage);
      this.id = userData.id;
      this.router.navigate(['/orders', this.id]);
    } else {
      alert("Sem usuário logado");
    }
  }

  logout() {
    this.authService.logout();
    alert("Deslogando...")
  }

}
