import { NgClass} from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductDetail } from '../product-detail/product-detail';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  standalone: true,
  imports: [NgClass, ProductDetail]
})
export class ProductList {
  pageTitle = 'Products';

  private productService = inject(ProductService);

  //boa pratica vincular de um template para um componente
  //não de um template para um serviço
  //readonly selectedProductId$ = this.productService.productSelected$; 

  selectedProductId = this.productService.selectedProductId;

  products = this.productService.products;
  errorMessage = this.productService.productsError;

  onSelected(productId: number): void {
    this.productService.productSelected(productId);
  }
}
