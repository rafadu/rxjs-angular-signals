import { Component, inject } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../cart.service';
import { CartTotal } from '../cart-total/cart-total';

@Component({
  selector: 'pm-cart-list',
  imports: [CartItemComponent,NgIf,NgFor,CartTotal],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.css',
  standalone: true,
})
export class CartList {
  private cartService = inject(CartService);
  pageTitle = 'Cart';

  cartItems = this.cartService.cartItems;
}
