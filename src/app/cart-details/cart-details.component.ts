import { Component, OnInit } from '@angular/core';
import { ProductsCartService } from '../products-cart.service';
import { Products } from '../admin/product';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  products: Products[];
  constructor(private productCartService: ProductsCartService) { }

  ngOnInit(): void {
    this.products = this.productCartService.getItems();
    console.log(this.products);
  }

}
