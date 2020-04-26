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
  orders: Orders[];
  orderDetails: OrderDetails[];

  constructor(private loginService: LoginService,
    private http: HttpClient) { }

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

  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    return throwError('Error! something went wrong.');
  }
}
