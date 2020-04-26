import { Component, OnInit } from '@angular/core';
import { ProductsCartService } from '../products-cart.service';
import { CartProducts } from '../admin/product';
import { element } from 'protractor';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  products: CartProducts[] ;
  subTotal: number = 0;
  discount: number = 0;
  
  constructor(public productCartService: ProductsCartService,
    public loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.products = this.productCartService.getItems();
    //console.log(this.products);
    //console.log(this.subTotal);

    this.products.forEach(element =>{
      this.subTotal = this.subTotal + element.totalPrice;
      this.discount = this.discount + element.totalDiscount;
    });
  }

  onDelete(product: CartProducts){
    console.log("delete");
    console.log(product);
    this.products=this.productCartService.deleteItems(product);
    this.productCartService.subTotal = this.productCartService.subTotal - product.totalPrice;
    this.productCartService.discount = this.productCartService.discount - product.totalDiscount;
  }

  onQuantity(product:CartProducts, $event){
    console.log(product);
    console.log($event);
    this.products = this.products.map(element =>{
      if(element.productId === product.productId){
        element.quantity = $event;
        element.totalPrice = element.pricePerKg * $event;
        element.totalDiscount = element.discount*$event;
        return element;
      }
      return element;
    });
    console.log(this.products);
    this.productCartService.subTotal = 0;
    this.productCartService.discount = 0;
    this.products.forEach(element =>{
      this.productCartService.subTotal = this.productCartService.subTotal + element.totalPrice;
      this.productCartService.discount = this.productCartService.discount + element.totalDiscount;
    });
    
  }

  onCheckout(){
    if(this.loginService.isUserLogin){
      this.productCartService.products = this.products;
      this.router.navigate(['check-out']);  
    }else{
      this.router.navigate(['login']);
    }
  }
}
