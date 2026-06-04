import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { signal } from '@angular/core';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  products = signal<Product[]>([]);

  getProducts(): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>('https://dummyjson.com/products');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }

  setProducts(products: Product[]): void {
    this.products.set(products);
  }
  addProduct(product: Product): void {
    this.products.update((products) => [...products, product]);
  }

  deleteProduct(productId: number): void {
    this.products.update((products) => products.filter((product) => product.id !== productId));
  }

  updateProduct(updatedProduct: Product): void {
    console.log('Updating Product:', updatedProduct);

    this.products.update((products) =>
      products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
    );

  }
}
