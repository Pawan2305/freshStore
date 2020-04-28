import { Component, OnInit } from '@angular/core';
import { ProductsCartService } from '../products-cart.service';
import { AddressService } from '../address.service';
import { PaymentService } from '../payment.service';
import { Address } from '../address';
import { CartProducts } from '../admin/product';
import { element } from 'protractor';
import { OrdersService } from '../orders.service';
import { OrderDetails, Orders } from '../orders';
import { Login } from '../login/login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  deliveryAddress: Address;
  products: CartProducts[] | OrderDetails[]=[];
  paymentMethod: string = '';
  total = 0;
  deliveryCharge = 0;
  subTotal = 0;
  discount = 0;
  orderId = 0;
  today;
  order: Orders;
    
  constructor(private productCartService: ProductsCartService,
    private addressService: AddressService,
    private paymentService: PaymentService,
    public orderService: OrdersService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    
    if(this.orderService.isSelected){
      this.subTotal =0;
      const email: Login ={
        loginId: this.loginService.customerId,
        pswd: ""
      }
      this.order =  this.orderService.selectedOrder;
      console.log(this.order);
      this.products = this.orderService.selectedOrderDetails;
      console.log(this.products);
      this.addressService.getAddress(email).subscribe(address =>{
        address.forEach(item =>{
          if(item.addressId === this.order.addressId){
            this.deliveryAddress = item;
          }
        })
      });
      this.deliveryCharge = this.order.deliveryCharge;
      this.orderId = this.order.orderId;
      this.today = this.order.orderDate;
      this.total = this.order.totalAmt;
      this.discount = this.order.totalDiscount;
      this.subTotal = (+this.total) + (+this.discount) - (+this.deliveryCharge);

    }else{
      this.today = new Date();
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
      });
    }
  }

}
