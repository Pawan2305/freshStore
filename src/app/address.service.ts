import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Address } from './address';
import { Login } from './login/login';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl = "http://localhost/api";

  deliveryAddress: Address;

  constructor(private http: HttpClient) { }

  addAddress(address: Address ): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/addAddress.php`, { data: address})
      .pipe(map((res) => {
        console.log(res);
        console.log("Address Inserted");
        return true;
      }),
      catchError(this.handleError));
  }

  getAddress(email: Login): Observable<Address[]>{
    return this.http.post(`${this.baseUrl}/AddressList.php`,{ data: email}).pipe(
      map((res) => {
        const data = res['data'];
        const addresses:Address[]= data;
        console.log(addresses);
        return addresses;
    }),
    catchError(this.handleError));
  }

  deleteAddress(id: number): Observable<boolean> {
    const params = new HttpParams()
      .set('addressId', id.toString());

    return this.http.delete(`${this.baseUrl}/deleteAddress.php`, { params: params })
      .pipe(map(res => {
        console.log("Address Deleted");
        return true;
      }),
      catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    return throwError('Error! something went wrong.');
  }
}
