import { Component } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item';
import { CartItem } from '../cart';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'pm-cart-list',
  imports: [CartItemComponent,NgIf,NgFor],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.css',
  standalone: true,
})
export class CartList {
  pageTitle = 'Cart';

  cartItems: CartItem[] = []
}
