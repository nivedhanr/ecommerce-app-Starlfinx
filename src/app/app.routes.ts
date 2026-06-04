import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup').then(m => m.Signup)
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/product-list/product-list').then(m => m.ProductList)
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then(m => m.ProductDetail)
  },
  {
    path: 'cart',

    canActivate: [
      authGuard
    ],

    loadComponent: () =>
      import('./pages/cart/cart').then(m => m.Cart)
  },
  {
    path: 'checkout',

    canActivate: [
      authGuard
    ],

    loadComponent: () =>
      import('./pages/checkout/checkout').then(m => m.Checkout)
  },
  {
    path: 'product-management',
    canActivate: [
      authGuard
    ],
    loadComponent: () =>
      import('./pages/product-management/product-management').then(m => m.ProductManagement)
  },
  {
    path: 'product-form',
    loadComponent: () =>
      import('./pages/product-form/product-form').then(m => m.ProductForm)
  },
  {
    path: 'product-form/:id',
    loadComponent: () =>
      import('./pages/product-form/product-form')
        .then(m => m.ProductForm)
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './pages/not-found/not-found'
      ).then(
        m => m.NotFound
      )
  }
];