import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  imports: [NgIf,NgFor,CurrencyPipe,AsyncPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  standalone: true,
})
export class ProductDetail implements OnChanges{
  
  @Input() productId: number = 0;
  errorMessage = '';
  //sub! : Subscription;
  product: Product | null = null;
  product$ : Observable<Product> | null = null;
  pageTitle: string = 'Product Detail';

  private productService = inject(ProductService);

  // ngOnDestroy(): void {
  //   if(this.sub){
  //     this.sub.unsubscribe();
  //   }
  // }
  ngOnChanges(changes: SimpleChanges): void {
    const id = changes['productId'].currentValue;
    if(id){
      //this.sub = this.productService.getProduct(id).subscribe(product => this.product = product);
      
      this.product$ =  this.productService.getProduct(id);
      this.product$.subscribe(product => this.pageTitle = `Product Detail for: ${product.productName}`);
    }
  }
  
  addToCart(product: Product){

  }
}
