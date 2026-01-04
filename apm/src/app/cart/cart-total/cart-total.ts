import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  standalone: true,
  selector: 'pm-cart-total',
  imports: [NgIf, CurrencyPipe],
  templateUrl: './cart-total.html',
  styleUrl: './cart-total.css',
})
export class CartTotal {
  private cartService = inject(CartService);
  
  cartItems = this.cartService.cartItems;
  subTotal = this.cartService.subTotal;
  deliveryFee = this.cartService.deliveryFee;
  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice;
}
