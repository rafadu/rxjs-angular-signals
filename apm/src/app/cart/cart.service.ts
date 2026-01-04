import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from './cart';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() => this.cartItems().reduce((accQty, item) => accQty + item.quantity,0));

  subTotal = computed(() => this.cartItems().reduce((accTotal, item) => accTotal + (item.quantity * item.product.price), 0));

  deliveryFee = computed<number>(() => this.subTotal() < 50 ? 5.99 : 0);

  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);

  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax());

  eLength = effect(() => console.log('Cart array length:', this.cartItems().length));

  addToCart(product: Product): void{
    this.cartItems.update(items => {

      const isAlreadyOnList = items.some(i => i.product.id === product.id);

      if(isAlreadyOnList){
        return items.map(i =>
          i.product.id === product.id
          ? {...i,quantity:this.defineQuantity(i,++i.quantity)}
          : i
        )  
      }
      
      return [...items, {product, quantity: 1}]
    });
  }

  private defineQuantity(cartItem: CartItem, quantity: number): number{
    return cartItem.product.quantityInStock != undefined && quantity <= cartItem.product.quantityInStock 
            ? quantity 
            : (cartItem.product.quantityInStock ?? 1);
  }

  removeFromCart(cartItem: CartItem):void {
    this.cartItems.update(items =>
      items.filter(item => item.product.id !== cartItem.product.id)
    )
  }

  updateQuantity(cartItem: CartItem, quantity: number): void{
    this.cartItems.update(items =>
      items.map(item => item.product.id === cartItem.product.id ?
        {...item, quantity} : item
      )
    );
  }
}
