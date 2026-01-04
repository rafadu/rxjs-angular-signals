import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, filter, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { Product, Result } from './product';
import { HttpErrorService } from '../../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);

  //private productSelectedSubject = new BehaviorSubject<number | undefined>(undefined); //privado para não ser acessado fora do serviço
  //readonly productSelected$ = this.productSelectedSubject.asObservable(); //readonly para não ser modificado, publico para permitir outros itens se inscreverem

  selectedProductId = signal<number | undefined>(undefined);

  //Observables para operações assíncronas 
  //Signals para gerenciamento básico de estado da aplicação
  private productsResult$ = this.http.get<Product[]>(this.productsUrl)
      .pipe(
        map(p => ({ data: p } as Result<Product[]>)),
        shareReplay(1),
        catchError(err => of({ 
          data: [], 
          error: this.errorService.formatError(err) 
        } as Result<Product[]>))
      );

  private productsResult = toSignal(this.productsResult$, { initialValue: ({ data: [] } as Result<Product[]>) });
  // products = computed(() => {
  //   try{
  //     return toSignal(this.products$, { initialValue: [] as Product[] })();
  //   } catch(error){
  //     return [] as Product[];
  //   }
  // });

  products = computed(() => this.productsResult().data);
  productsError = computed(() => this.productsResult().error);

  private productResult1$ = toObservable(this.selectedProductId)
        .pipe(
          filter(Boolean),
          switchMap(id => {
            const productUrl = this.productsUrl + '/' + id;
            return this.http.get<Product>(productUrl)
                .pipe(
                  switchMap(product => this.getProductWithReviews(product)),
                  catchError(err => of({ data: undefined, error: this.errorService.formatError(err)} as Result<Product>))
                )
          }),
          map(p => ({ data : p} as Result<Product>))
        );

  private foundProduct = computed(() => {
    const p = this.products();
    const id = this.selectedProductId();
    if(p && id){
      return p.find(product => product.id === id);
    }
    return undefined;
  });

  private productResult$ = toObservable(this.foundProduct)
    .pipe(
      filter(Boolean),
      switchMap(product => this.getProductWithReviews(product)),
      map(p => ({data: p} as Result<Product>)),
      catchError(err => of({data:undefined, error: this.errorService.formatError(err)} as Result<Product>))
    );

    private productResult = toSignal(this.productResult$);
    product = computed(() => this.productResult()?.data);
    productError = computed(() => this.productResult()?.error);

  // product$ = combineLatest([
  //   this.productSelected$,
  //   this.products$
  // ]).pipe(
  //   map(([selectedProductId, products])=>
  //     products.find(product => product.id === selectedProductId)
  //   ),
  //   filter(Boolean),
  //   switchMap(product => this.getProductWithReviews(product)),
  //   catchError(err => this.handleError(err))
  // )

  productSelected(selectedProductId: number){
    //this.productSelectedSubject.next(selectedProductId);
    this.selectedProductId.set(selectedProductId);
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
  
  // private handleError(err: HttpErrorResponse): Observable<never>{
  //   const formattedMessage = this.errorService.formatError(err);
  //   return throwError(() => formattedMessage);
  //   // throw formattedMessage;
  // }
}
