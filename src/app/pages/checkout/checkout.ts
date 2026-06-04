import {
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { CouponService } from '../../services/coupon/coupon.service';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {

  private cartService = inject(CartService);
  private couponService = inject(CouponService);

  cartItems = signal<CartItem[]>([]);

  discount = signal(0);
  couponMessage = signal('');

  ngOnInit(): void {
  
    this.cartItems.set(
      this.cartService.getCartItems()
    );
  
    this.discount.set(
      this.cartService.getDiscount()
    );
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

  applyCoupon(code: string): void {

    const coupon =
      this.couponService.validateCoupon(
        code,
        this.subtotal()
      );
  
    if (!coupon) {
  
      this.couponMessage.set(
        'Invalid coupon or coupon requirements not met.'
      );
  
      return;
    }
  
    this.cartService.setDiscount(
      coupon.discount
    );
  
    this.discount.set(
      coupon.discount
    );
  
    this.couponMessage.set(
      `${coupon.code} applied successfully!`
    );
  }
  
}