import { Injectable } from '@angular/core';
import { AddressService } from './address.service';
import { ProductsCartService } from './products-cart.service';
import { Orders, OrderDetails } from './orders';
import { LoginService } from './login.service';
import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CartProducts } from './admin/product';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl = "http://localhost/api";

  total: number;
  deliveryCharges: number;
  deliveryType: string;
  paymentMethod: string;
  orderId: number =0;

  constructor(private addressService: AddressService,
    private productCartService: ProductsCartService,
    private loginService: LoginService,
    private http: HttpClient) { }

  addOrders() : Observable<boolean>{
    let today = new Date();
    let jstToday = formatDate(today, 'dd-MM-yyyy', 'en-US', '+0530');
    console.log(jstToday); 

    let order: Orders = {
     orderId  : 0,
     customerEmail  : this.loginService.customerId,
     deliveryType  : this.deliveryType,
     addressId  : this.addressService.deliveryAddress.addressId,
     orderDate  : jstToday,
     deliveryCharge  : this.deliveryCharges,
     orderStatus  : "Placed",
     totalAmt  : this.total,
     totalDiscount  : this.productCartService.discount,
    };
    console.log(order);

    return this.http.post(`${this.baseUrl}/addOrder.php`, { data: order})
      .pipe(map((res) => {
        console.log(res['data'][0].id);
        this.orderId = res['data'][0].id;
        console.log(this.orderId);
        console.log("Order Inserted");
        return true;
      }),
      catchError(this.handleError));
  }
  

  addOrderDetails(product: CartProducts): Observable<boolean>{
    let orderDetail : OrderDetails = {
      orderDetailId: 0,
      orderId: this.orderId,
      productId: product.productId,
      price: product.totalPrice,
      discount: product.totalDiscount,
      quantity: product.quantity
    }
    console.log(orderDetail);

    return this.http.post(`${this.baseUrl}/addOrderdetail.php`, { data: orderDetail})
    .pipe(map((res) => {
      console.log("Order Inserted");
      return true;
    }),
    catchError(this.handleError));

  }


  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    return throwError('Error! something went wrong.');
  }
}
