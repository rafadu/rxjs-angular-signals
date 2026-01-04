import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'pm-product-detail',
  imports: [CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  standalone: true,
})
export class ProductDetail{
   @Input() productId: number = 0;

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  
  // product$ = this.productService.product$
  //     .pipe(
  //       catchError(err => {
  //         this.errorMessage = err;
  //         return of(null);
  //       })
  //     );

  product = this.productService.product;
  errorMessage = this.productService.productError;
  //pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';
  pageTitle = computed(() => this.product()? `Product Detail for: ${this.product()?.productName}`: "Product Detail");
  
  addToCart(product: Product){
    this.cartService.addToCart(product);
  }
}
