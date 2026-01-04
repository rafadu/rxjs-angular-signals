import { Component, inject } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item';
import { CartService } from '../cart.service';

@Component({
  selector: 'pm-cart-list',
  imports: [CartItemComponent],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.css',
  standalone: true,
})
export class CartList {
  private cartService = inject(CartService);
  pageTitle = 'Cart';

  cartItems = this.cartService.cartItems;
}
