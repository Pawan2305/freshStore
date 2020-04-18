import { Injectable } from '@angular/core';
import { Products, CartProducts } from './admin/product';
import { element } from 'protractor';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Login } from './login/login';
import { ProductsService } from './admin/products.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsCartService {

  baseUrl = "http://localhost/api";

  products:CartProducts[] = [];
  subTotal = 0;
  exists: boolean = false;
  constructor(private http: HttpClient,
    private loginService: LoginService,
    private productService: ProductsService) { }

  addToCart(product) {
    this.products.forEach(element=>{
      if(element.productId === product.productId){
        this.exists = true;
      }
    });
    if(!this.exists){
      const item:CartProducts={
        productId: product.productId,
        productName: product.productName,
        pricePerKg: +product.pricePerKg,
        quantity: 1,
        totalPrice: +product.pricePerKg,
        image: product.image
      };
      this.products.push(item);
      const prod = {
        productId: product.productId,
        customerId: this.loginService.customerId,
        quantity: item.quantity
      };
      if(this.loginService.isUserLogin){
        this.addToDatabase(prod).subscribe(res =>{
          if(res){
            console.log("Product added to database");
          }
        });
      }
      console.log(item);
    } 
  }

  deleteItems(product: CartProducts):CartProducts[]{
    console.log(product);
    const products =  this.products.filter(element => element !==product);
    console.log(products);
    this.products = products;
    return this.products;
  }

  getItems() {
    if(this.loginService.isUserLogin){
      this.products =[];
      const email: Login ={
        loginId: this.loginService.customerId,
        pswd: ""
      }
      let itemQuantiy;
      this.getItemFromDatabase(email).subscribe(res => {
        res.forEach(item =>{
          const cartItem = {
            productId: +item.productId
          }
          itemQuantiy = +item.quantity;
          this.productService.getProductById(cartItem).subscribe(product =>{
            const item:CartProducts={
              productId: product.productId,
              productName: product.productName,
              pricePerKg: +product.pricePerKg,
              quantity: itemQuantiy,
              totalPrice: itemQuantiy*(+product.pricePerKg),
              image: product.image
            };
            this.productService.getImage(item.image).subscribe(image => {
              let reader = new FileReader();
              reader.addEventListener("load", () => {
                item.image = <string>reader.result;
              }, false);
              if (image) {
                reader.readAsDataURL(image);
              }
            }, error => {
              console.log(error);
            });
            this.products.push(item);
            
          });
        }); 
      });
    }
    console.log(this.products);
    return this.products;
  }

  clearCart() {
    this.products = [];
    return this.products;
  }

  addToDatabase(product): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/addCart.php`, { data: product})
      .pipe(map((res) => {
        console.log(res);
        console.log("Data Inserted");
        return true;
      }),
      catchError(this.handleError));
  }

  getItemFromDatabase(email: Login): Observable<CartItems[]>{
    return this.http.post(`${this.baseUrl}/getCartItems.php`,{ data: email}).pipe(
      map((res) => {
        const data = res['data'];
        const itemsFormCartDatabase: CartItems[]= data;
        return itemsFormCartDatabase;
    }),
    catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    return throwError('Error! something went wrong.');
  }
}


export interface CartItems{
  productId: string;
  quantity: string; 
}
