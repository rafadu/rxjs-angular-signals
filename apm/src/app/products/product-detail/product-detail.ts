import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'pm-product-detail',
  imports: [NgIf,NgFor,CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  standalone: true,
})
export class ProductDetail {
  @Input() productId: number = 0;
  errorMessage = '';

  product: Product | null = null;

  pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';

  addToCart(product: Product){

  }
}
