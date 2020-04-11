import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsCartService {

  products = [];

  constructor() { }

  addToCart(product) {
    this.products.push(product);
  }

  getItems() {
    return this.products;
  }

  clearCart() {
    this.products = [];
    return this.products;
  }
}
