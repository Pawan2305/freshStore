import { Injectable } from '@angular/core';
import { Login } from './login/login';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { signup } from './sign-up/sign-up';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost/api';
  login: Login[];
  username: string;
  customerId;
  isUserLogin: boolean = false;
  public isLogin: boolean = true;
  public useremail: string;
  public category: string = "";

  isShowSideBar:boolean = true;
  padding = 0;
  layoutWidth = 1135;
                
  constructor(private http: HttpClient) { }

  getIsLogin():string{
    return this.useremail;
  }

  setIsLogin(isLogin, username):void{
    this.isLogin = isLogin;
    this.useremail = username;
    this.isUserLogin = true;
    console.log(this.useremail);
  }
                
  getAll(): Observable<Login[]> {
    return this.http.get(`${this.baseUrl}/list.php`).pipe(
      map((res) => {
        this.login = res['data'];
        return this.login;
    }),
    catchError(this.handleError));
  }

  getUserName(email: Login):Observable<signup>{
    return this.http.post(`${this.baseUrl}/customer.php`, { data: email}).pipe(
      map((res) => {
        this.username = res['customerName'];
        this.customerId = res['email'];
        console.log(this.username);
        let user: signup = {
          name: res['customerName'],
          email: res['email'],
          phoneNo: res['phone'],
          password: ""
        }
        return user;
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
