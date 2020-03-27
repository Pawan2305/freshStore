import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { signup } from './sign-up';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  baseUrl = 'http://localhost/api';
                
  constructor(private http: HttpClient) { }

  signup(signupData: signup): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/signup.php`, { data: signupData })
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
