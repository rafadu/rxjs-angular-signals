import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, filter, map, Observable, of, shareReplay, switchMap, throwError } from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);

  private productSelectedSubject = new BehaviorSubject<number | undefined>(undefined); //privado para não ser acessado fora do serviço
  readonly productSelected$ = this.productSelectedSubject.asObservable(); //readonly para não ser modificado, publico para permitir outros itens se inscreverem

  readonly products$ = this.http.get<Product[]>(this.productsUrl)
      .pipe(
        shareReplay(1),
        catchError(err => this.handleError(err))
      );

  product$ = combineLatest([
    this.productSelected$,
    this.products$
  ]).pipe(
    map(([selectedProductId, products])=>
      products.find(product => product.id === selectedProductId)
    ),
    filter(Boolean),
    switchMap(product => this.getProductWithReviews(product)),
    catchError(err => this.handleError(err))
  )

  productSelected(selectedProductId: number){
    this.productSelectedSubject.next(selectedProductId);
  }

  private getProductWithReviews(product: Product): Observable<Product> {
    if(product.hasReviews){
      return this.http.get<Review[]>(this.reviewService.getReviewUrl(product.id))
              .pipe(
                map(reviews => ({ ...product, reviews} as Product))
              );
              
    } else {
      return of(product);
    }
  }
  
  private handleError(err: HttpErrorResponse): Observable<never>{
    const formattedMessage = this.errorService.formatError(err);
    return throwError(() => formattedMessage);
    // throw formattedMessage;
  }
}
