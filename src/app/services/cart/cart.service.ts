import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSubject =
    new BehaviorSubject<CartItem[]>([]);

  cartItems$ =
    this.cartItemsSubject.asObservable();

  private discountSubject =
    new BehaviorSubject<number>(0);

  discount$ =
    this.discountSubject.asObservable();

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  setDiscount(discount: number): void {
    this.discountSubject.next(discount);
  }

  getDiscount(): number {
    return this.discountSubject.value;
  }

  addToCart(product: Product): void {

    const cartItems = this.getCartItems();

    const existingItem = cartItems.find(
      item => item.product.id === product.id
    );

    if (existingItem) {

      const updatedItems = cartItems.map(item =>
        item.product.id === product.id
          ? {
            ...item,
            quantity: item.quantity + 1
          }
          : item
      );

      this.cartItemsSubject.next(updatedItems);

    } else {

      const updatedItems = [
        ...cartItems,
        {
          product,
          quantity: 1
        }
      ];

      this.cartItemsSubject.next(updatedItems);
    }
  }

  removeFromCart(productId: number): void {

    const updatedItems =
      this.getCartItems().filter(
        item => item.product.id !== productId
      );

    this.cartItemsSubject.next(updatedItems);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  updateQuantity(
    productId: number,
    quantity: number
  ): void {

    if (quantity < 1) {
      return;
    }

    const updatedItems =
      this.getCartItems().map(item =>
        item.product.id === productId
          ? {
            ...item,
            quantity
          }
          : item
      );

    this.cartItemsSubject.next(updatedItems);
  }

  getSubtotal(): number {
    return this.getCartItems().reduce(
      (total, item) =>
        total + (item.product.price * item.quantity),
      0
    );
  }

  getTax(): number {
    return this.getSubtotal() * 0.18;
  }

  getTotal(): number {
    return (
      this.getSubtotal() +
      this.getTax() -
      this.getDiscount()
    );
  }
}