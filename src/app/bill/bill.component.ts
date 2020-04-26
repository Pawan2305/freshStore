import { Component, OnInit } from '@angular/core';
import { ProductsCartService } from '../products-cart.service';
import { AddressService } from '../address.service';
import { PaymentService } from '../payment.service';
import { Address } from '../address';
import { CartProducts } from '../admin/product';
import { element } from 'protractor';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  deliveryAddress: Address;
  products: CartProducts[] =[];
  paymentMethod: string = '';
  total = 0;
  deliveryCharge = 0;
  subTotal = 0;
  discount = 0;
  orderId = 0;
  today = new Date();
  
  constructor(private productCartService: ProductsCartService,
    private addressService: AddressService,
    private paymentService: PaymentService) { }

  ngOnInit(): void {
    
    
    this.orderId = this.paymentService.orderId;
    this.deliveryAddress = this.addressService.deliveryAddress;
    this.products = this.productCartService.products;
    this.paymentMethod = this.paymentService.paymentMethod;
    this.deliveryCharge = this.paymentService.deliveryCharges;
    this.total = this.paymentService.total;
    this.discount = this.productCartService.discount;
    this.subTotal = this.total + this.discount - this.deliveryCharge;
    
    /*this.products.forEach(element =>{
      this.subTotal = this.subTotal+ element.totalPrice;
    })*/
    this.products.forEach(item => {
      this.productCartService.deleteCartItem(item.cartId).subscribe( (res: boolean) =>{
        if(res){
          console.log(item);
          console.log("Product Deleted");
        }
        else{
          console.log("Product Not deleted");
        }
      });
    })
   
  }

}
