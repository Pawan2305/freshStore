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

  constructor(private productCartService: ProductsCartService,
    private addressService: AddressService,
    private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.deliveryAddress = this.addressService.deliveryAddress;
    this.products = this.productCartService.products;
    this.paymentMethod = this.paymentService.paymentMethod;
    this.deliveryCharge = this.paymentService.deliveryCharges;
    this.total = this.paymentService.total;
    
    this.products.forEach(element =>{
      this.subTotal = this.subTotal+ element.totalPrice;
    })
  }

}
