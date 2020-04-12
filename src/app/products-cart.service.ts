import { Injectable } from '@angular/core';
import { Products } from './admin/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsCartService {

  products:Products[] = [];
  exists: boolean = false;
  constructor() { }

  addToCart(product) {
    this.products.forEach(element=>{
      if(element.productId === product.productId){
        this.exists = true;
      }
    });
    if(!this.exists){
      this.products.push(product);
    }
    
  }

  getItems() {
    return this.products;
  }

  clearCart() {
    this.products = [];
    return this.products;
  }
}
