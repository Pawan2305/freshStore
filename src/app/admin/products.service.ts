import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Products } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = 'http://localhost/api';
                
  constructor(private http: HttpClient) { }

  addProduct(productData: Products): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/addProduct.php`, { data: productData })
      .pipe(map((res) => {
        console.log(res);
        console.log("Data Inserted");
        return true;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
