import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PageNotFoundComponent } from '../utilities/page-not-found';

export const routes: Routes = [
    { path: 'welcome', component: Home },
    {
        path: 'products',
        loadComponent: () => import('./products/product-list/product-list').then(c => c.ProductList)
    },
    {
        path: 'cart',
        loadComponent: () => import('./cart/cart-shell/cart-shell').then(c => c.CartShellComponent)
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent}
];
