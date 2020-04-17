import { Injectable } from '@angular/core';
import { Products, CartProducts } from './admin/product';
import { element } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class ProductsCartService {

  products:CartProducts[] = [];
  exists: boolean = false;
  constructor() { }

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
    return this.products;
  }

  clearCart() {
    this.products = [];
    return this.products;
  }
}
