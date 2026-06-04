import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {

  private cartService = inject(CartService);
  private router = inject(Router);

  cartItems = signal<CartItem[]>([]);

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems.set(items);
    });
  }

  increaseQuantity(productId: number, currentQuantity: number): void {
    this.cartService.updateQuantity(
      productId,
      currentQuantity + 1
    );
  }

  decreaseQuantity(productId: number, currentQuantity: number): void {

    if (currentQuantity <= 1) {
      return;
    }

    this.cartService.updateQuantity(
      productId,
      currentQuantity - 1
    );
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  subtotal(): number {
    return this.cartService.getSubtotal();
  }
  
  tax(): number {
    return this.cartService.getTax();
  }
  
  total(): number {
    return this.cartService.getTotal();
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}