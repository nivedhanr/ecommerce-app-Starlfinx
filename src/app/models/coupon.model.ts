export interface Coupon {
  code: string;
  discount: number;
  minCartValue: number;
  expiryDate: Date;
}
