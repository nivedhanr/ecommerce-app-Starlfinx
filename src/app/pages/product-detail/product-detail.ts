import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private router = inject(Router);

  product = signal<Product | null>(null);
  loading = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loading.set(true);

    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load product');
        this.loading.set(false);
      }
    });
  }

  addToCart(): void {

    const product = this.product();
  
    if (!product) {
      return;
    }
  
    this.cartService.addToCart(product);

    this.router.navigate(['/cart']);
  }
}