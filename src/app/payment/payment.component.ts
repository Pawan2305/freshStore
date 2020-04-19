import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  deliveryCharge: number = 0;
  total: number = 0;
  isPaymentMethodSelected = false;
  paymentMethod = '';

  constructor(private addressServcie: AddressService,
    private paymentService: PaymentService ) { }

  ngOnInit(): void {
    this.deliveryCharge = this.paymentService.deliveryCharges;
    this.total = this.paymentService.total;
    console.log(this.addressServcie.deliveryAddress);
    console.log(this.paymentService.total);
    console.log(this.paymentService.deliveryCharges);
  }

  onPaymentMethod($event){
    if($event === "cash"){
      this.paymentMethod = "Cash On Delivery";
      this.isPaymentMethodSelected = true;
    }else{
      this.paymentMethod = "Card Payment";
      this.isPaymentMethodSelected = true;
    }

    this.paymentService.paymentMethod = this.paymentMethod;
  }

}
