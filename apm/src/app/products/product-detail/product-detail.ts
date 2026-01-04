import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../product';
import { catchError, Observable, of} from 'rxjs';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'pm-product-detail',
  imports: [NgIf,NgFor,CurrencyPipe,AsyncPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  standalone: true,
})
export class ProductDetail{
   @Input() productId: number = 0;
  errorMessage = '';

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  
  product$ = this.productService.product$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return of(null);
        })
      );
  pageTitle: string = 'Product Detail';
  
  addToCart(product: Product){
    this.cartService.addToCart(product);
  }
}
