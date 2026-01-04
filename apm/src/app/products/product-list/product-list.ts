import { NgClass, NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductDetail } from '../product-detail/product-detail';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, map, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  standalone: true,
  imports: [NgIf, NgFor,NgClass, ProductDetail, AsyncPipe]
})
export class ProductList {
  pageTitle = 'Products';
  errorMessage = '';

  private productService = inject(ProductService);

  //boa pratica vincular de um template para um componente
  //não de um template para um serviço
  readonly selectedProductId$ = this.productService.productSelected$; 

  readonly products$: Observable<Product[]> = this.productService.products$
    .pipe(
      map(products => products.filter(p => p.quantityInStock !== undefined && p.quantityInStock > 0)),
      catchError(err => {
        this.errorMessage = err;
        return of([]);
        //return EMPTY;
      })
    );

  sub!: Subscription;
  onSelected(productId: number): void {
    this.productService.productSelected(productId);
  }
}
