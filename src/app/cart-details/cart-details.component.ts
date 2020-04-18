import { Component, OnInit } from '@angular/core';
import { ProductsCartService } from '../products-cart.service';
import { CartProducts } from '../admin/product';
import { element } from 'protractor';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  products: CartProducts[] ;
  subTotal = 0;
  constructor(private productCartService: ProductsCartService) { }

  ngOnInit(): void {
    this.products = this.productCartService.getItems();
    console.log(this.products);
    console.log(this.subTotal);
    for(let i in this.products){
      console.log(i);
    }
  }

  onDelete(product: CartProducts){
    console.log("delete");
    console.log(product);
    this.products=this.productCartService.deleteItems(product);
    this.subTotal = this.subTotal - product.totalPrice;
  }

  onQuantity(product:CartProducts, $event){
    console.log(product);
    console.log($event);
    this.products = this.products.map(element =>{
      if(element.productId === product.productId){
        element.quantity = $event;
        element.totalPrice = element.pricePerKg * $event;
        return element;
      }
      return element;
    });
    console.log(this.products);
    this.subTotal = 0;
    this.products.forEach(element =>{
      this.subTotal = this.subTotal + element.totalPrice;
    });
  }
}
