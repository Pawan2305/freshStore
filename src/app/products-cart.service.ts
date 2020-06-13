import { Injectable } from '@angular/core';
import { Products, CartProducts } from './admin/product';
import { element } from 'protractor';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
  total = 0;
  subTotal = 0;
  exists: boolean = false;
  discount: number = 0;
  constructor(private http: HttpClient,
    private loginService: LoginService,
    private productService: ProductsService) { }

  addToCart(product) {
    console.log("In Add Service");
    console.log(this.products);
    this.products.forEach(element=>{
      if(element.productId === product.productId){
        this.exists = true;
      }
    });
    if(!this.exists){
      console.log("In adding");
      const item:CartProducts={
        cartId: 1,
        productId: product.productId,
        productName: product.productName,
        pricePerKg: +product.pricePerKg,
        quantity: 1,
        totalPrice: +product.pricePerKg,
        discount: ((+product.marketPrice)-(+product.pricePerKg)),
        totalDiscount: ((+product.marketPrice)-(+product.pricePerKg)),
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
    if(this.loginService.isUserLogin){
      this.deleteCartItem(product.cartId).subscribe( (res: boolean) =>{
        if(res){
          console.log(product);
          const index = this.products.indexOf(product);
          console.log(index);
          if (index > -1) {
            this.products.splice(index, 1);
          }
          console.log("Product Deleted");
        }
        else{
          console.log("Product Not deleted");
        }
      });
    }else{
      console.log(product);
      const products =  this.products.filter(element => element !==product);
      this.products = products;
    }
    console.log(this.products);
    return this.products;
  }

  getItems(): CartProducts[]{
    this.subTotal = 0;
    this.discount = 0;
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
          let cartId = +item.cartId;
          this.productService.getProductById(cartItem).subscribe(product =>{
            const item:CartProducts={
              cartId: cartId,
              productId: product.productId,
              productName: product.productName,
              pricePerKg: +product.pricePerKg,
              quantity: itemQuantiy,
              totalPrice: itemQuantiy*(+product.pricePerKg),
              discount: itemQuantiy* ((+product.marketPrice)-(+product.pricePerKg)),
              totalDiscount: itemQuantiy* ((+product.marketPrice)-(+product.pricePerKg)),
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
            this.subTotal = this.subTotal + item.totalPrice;
            this.discount = this.discount + item.totalDiscount;
            this.total = this.discount + this.subTotal;
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

  deleteCartItem(id: number): Observable<boolean> {
    const params = new HttpParams()
      .set('cartId', id.toString());

    return this.http.delete(`${this.baseUrl}/deleteCartItem.php`, { params: params })
      .pipe(map(res => {
        console.log("Product Deleted");
        return true;
      }),
      catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    return throwError('Error! something went wrong.');
  }
}


export interface CartItems{
  cartId: string;
  productId: string;
  quantity: string; 
}
