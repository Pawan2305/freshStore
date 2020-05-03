import { Injectable } from '@angular/core';
import { Login } from './login/login';
import { LoginService } from './login.service';
import { Orders, OrderDetails } from './orders';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = "http://localhost/api";
  allOrders: Orders[];
  orders: Orders[];
  orderDetails: OrderDetails[];
  selectedOrder: Orders;
  selectedOrderDetails: OrderDetails[]=[];
  isSelected: boolean= false;

  constructor(private loginService: LoginService,
    private http: HttpClient) { }

  
  getAllOrders(): Observable<Orders[]> {
    return this.http.get(`${this.baseUrl}/orders/getAllOrders.php`).pipe(
      map((res) => {
        this.allOrders = res['data'];
        console.log(this.allOrders);
        return this.allOrders;
      }),
      catchError(this.handleError));
  }

  getOrders(): Observable<Orders[]>{
    const email: Login ={
      loginId: this.loginService.customerId,
      pswd: ""
    }
    return this.http.post(`${this.baseUrl}/orders/getOrders.php`,{ data: email}).pipe(
      map((res) => {
        const data = res['data'];
        console.log(data) ;
        this.orders = data;
        //console.log(this.orderDetails);
        return this.orders;
    }),
    catchError(this.handleError));  
  }

  getOrderDetails(id: number): Observable<OrderDetails[]>{
    let oId ={
      orderId: id
    }
    return this.http.post(`${this.baseUrl}/orders/getOrderDetails.php`,{ data: oId}).pipe(
      map((res) => {
        const data = res['data'];
        this.orderDetails = data;  
        return this.orderDetails;     
    }),
    catchError(this.handleError)); 
  }

  getPlacedOrders(): Observable<Orders[]>{
    return this.http.get(`${this.baseUrl}/orders/orderPlacedList.php`).pipe(
      map((res) => {
        const data = res['data'];
        console.log(data) ;
        this.orders = data;
        //console.log(this.orderDetails);
        return this.orders;
    }),
    catchError(this.handleError));  
  }

  getDeliveredOrders(): Observable<Orders[]>{
    return this.http.get(`${this.baseUrl}/orders/orderDeliverList.php`).pipe(
      map((res) => {
        const data = res['data'];
        console.log(data) ;
        this.orders = data;
        //console.log(this.orderDetails);
        return this.orders;
    }),
    catchError(this.handleError));  
  }

  getCancelledOrders(): Observable<Orders[]>{
    return this.http.get(`${this.baseUrl}/orders/orderCancelList.php`).pipe(
      map((res) => {
        const data = res['data'];
        console.log(data) ;
        this.orders = data;
        //console.log(this.orderDetails);
        return this.orders;
    }),
    catchError(this.handleError));  
  }

  updateOrderStatus(order: Orders): Observable<boolean>{
    return this.http.put(`${this.baseUrl}/orders/updateOrder.php`, { data: order })
      .pipe(map((res) => {
        console.log(res);
        console.log(" Order Updated");
        return true;
      }),
      catchError(this.handleError)); 
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    return throwError('Error! something went wrong.');
  }
}
