import { Component } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  logout() {
    alert("Deslogando...")
  }
}
