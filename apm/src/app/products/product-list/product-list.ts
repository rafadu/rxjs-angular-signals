import { NgClass, NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductDetail } from '../product-detail/product-detail';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY, Observable, of, Subscription, tap } from 'rxjs';

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

  private produtctService = inject(ProductService);

  selectedProductId: number = 0;

  products$: Observable<Product[]> = this.produtctService.getProducts()
    .pipe(
      tap(() => console.log('In component pipeline')),
      catchError(err => {
        this.errorMessage = err;
        return of([]);
        //return EMPTY;
      })
    );
  
  products: Product[] = [];


  sub!: Subscription;
  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  // ngOnInit(): void {
  //   this.sub = this.produtctService.getProducts()
  //   .pipe(
  //     tap(() => console.log('In component pipeline'))
  //   )
  //   .subscribe({
  //     next: products => { 
  //       this.products = products;
  //       console.log(this.products);
  //     },
  //     error: err => this.errorMessage = err
  //   });
  // }


}
