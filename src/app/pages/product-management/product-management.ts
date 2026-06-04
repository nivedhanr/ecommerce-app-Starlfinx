import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { PricePipe } from '../../pipes/price-pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PricePipe,
    HighlightDirective
  ],
  templateUrl: './product-management.html',
  styleUrl: './product-management.scss',
})
export class ProductManagement implements OnInit{

  productService = inject(ProductService);

  products = this.productService.products;

  ngOnInit(): void {

    if (
      this.productService.products().length === 0
    ) {
  
      this.productService
        .getProducts()
        .subscribe(response => {
  
          this.productService.setProducts(
            response.products
          );
  
        });
  
    }
  
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId);
  }

}