import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'pm-cart-item',
  imports: [CurrencyPipe,FormsModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  @Input({ required: true }) set cartItem(ci: CartItem) {
    this.item.set(ci);
  }

  private cartService = inject(CartService);

  item = signal<CartItem>(undefined!);
  qtyArr = [...Array(8).keys()].map(x => x + 1);
  qtyArr2 = computed(() => [...Array(this.item().product.quantityInStock).keys()].map(x => x+ 1));

  exPrice = computed(() => this.item().quantity * this.item().product.price);

  onQuantitySelected(quantity: number): void {
    this.cartService.updateQuantity(this.item(),Number(quantity));
  }

  removeFromCart(): void{
    this.cartService.removeFromCart(this.item());
  }
}
