import { Injectable } from '@angular/core';
import { Login } from './login';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost/api';
  login: Login[];
                
  constructor(private http: HttpClient) { }
                
  getAll(): Observable<Login[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
        this.login = res['data'];
        return this.login;
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
