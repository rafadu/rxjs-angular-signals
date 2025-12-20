import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ProductDetail } from '../product-detail/product-detail';
import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  standalone: true,
  imports: [NgIf, NgFor,NgClass, ProductDetail]
})
export class ProductList {
  pageTitle = 'Products';
  errorMessage = '';

  products: Product[] = [];

  selectedProductId: number = 0;

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
