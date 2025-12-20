import { CurrencyPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'pm-cart-total',
  imports: [NgIf, CurrencyPipe],
  templateUrl: './cart-total.html',
  styleUrl: './cart-total.css',
})
export class CartTotal {
  cartItems = [];

  subTotal = 100;
  deliveryFee = 20;
  tax = 10;
  totalPrice = this.subTotal + this.deliveryFee + this.tax;
}
