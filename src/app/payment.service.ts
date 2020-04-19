import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  total: number;
  deliveryCharges: number;
  paymentMethod: string;

  constructor() { }
}
