import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { PaymentService } from '../payment.service';
import { ProductsCartService } from '../products-cart.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  deliveryCharge: number = 0;
  total: number = 0;
  isPaymentMethodSelected = true;
  paymentMethod = '';
  
  

  constructor(private addressServcie: AddressService,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    public productCartService: ProductsCartService,
    private router: Router ) { }

  ngOnInit(): void {

    this.deliveryCharge = this.paymentService.deliveryCharges;
    this.total = this.paymentService.total;
  }

  onPaymentMethod($event){
    console.log($event);
    if( $event === "cash"){
      this.paymentMethod = "Cash On Delivery";
      this.isPaymentMethodSelected = true;
    }else{
      this.paymentMethod = "Card Payment";
      this.isPaymentMethodSelected = true;
    }

    this.paymentService.paymentMethod = this.paymentMethod;
  }

  onPay(){
    this.paymentService.addOrders().subscribe(res =>{
      if(res){
        console.log("Success");
        this.productCartService.products.forEach(element =>{
          this.paymentService.addOrderDetails(element).subscribe(result =>{
            if(result){
              console.log("Order product added");
            }else{
              console.log("Not Added");
            }
          });
        })
      }else{
        console.log("UnSuccess");
      }
    });

    this.router.navigate(['bill']);
  }

}
