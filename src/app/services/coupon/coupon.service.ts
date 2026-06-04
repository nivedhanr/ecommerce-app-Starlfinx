import { Injectable } from '@angular/core';
import { Coupon } from '../../models/coupon.model';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private coupons: Coupon[] = [
    {
      code: 'SAVE10',
      discount: 10,
      minCartValue: 50,
      expiryDate: new Date('2027-12-31'),
    },
    {
      code: 'SAVE20',
      discount: 20,
      minCartValue: 100,
      expiryDate: new Date('2027-12-31'),
    },
  ];

  validateCoupon(code: string, cartValue: number): Coupon | null {
    const coupon = this.coupons.find((c) => c.code === code.toUpperCase());

    if (!coupon) {
      return null;
    }

    if (new Date() > coupon.expiryDate) {
      return null;
    }

    if (cartValue < coupon.minCartValue) {
      return null;
    }

    return coupon;
  }
}
