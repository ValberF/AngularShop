import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  id!: string;
  orders!: any;

  constructor(private routes: Router, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartsByUser(this.route.snapshot.paramMap.get('id')!).then(carts => {
      this.orders = carts;
      console.log(this.orders)
    }).catch(error => {
      console.error("Error fetching carts: ", error);
    });
  }
}
