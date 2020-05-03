import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Orders, OrderDetails, ProductDetails } from '../orders';
import { ProductsService } from '../admin/products.service';
import { AddressService } from '../address.service';
import { Address } from '../address';
import { Login } from '../login/login';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {

  order: Orders;
  onView: boolean = false;
  address: Address;
  imageWidth = 70;
  imageMargin = 2;
  orderDetails: OrderDetails[];
  productDetails: ProductDetails[] = [];
  placed: boolean = false;
  shipped: boolean = false;
  delivered: boolean = false;

  constructor(private orderService: OrdersService,
    private productService: ProductsService,
    private addressService: AddressService) { }

  ngOnInit(): void {
    console.log(this.orderService.trackOrderId);
    this.orderService.getOrderById().subscribe(
      item =>{
        this.order = item[0];
        if(this.order.orderStatus === "Placed"){
          this.placed = true;
        }
        if(this.order.orderStatus === "Shipped"){
          this.placed = true;
          this.shipped = true;
        }
        if(this.order.orderStatus === "Delivered"){
          this.placed = true;
          this.shipped = true;
          this.delivered = true;
        }
        console.log(this.order);
      }
    );
  }

  onViewOrderDetails(){
    this.onView = !this.onView;
    this.address = null;
    this.productDetails = [];
    const email: Login ={
      loginId: this.order.customerEmail,
      pswd: ""
    }
    this.addressService.getAddress(email).subscribe(
      res =>{
        this.address = res.find(address => address.addressId === this.order.addressId);
        console.log(this.address);
      }
    );

    this.orderService.getOrderDetails(this.order.orderId).subscribe(result =>{
      result.forEach(item =>{
        let product = this.productService.product.find(prod => prod.productId === item.productId);
        let productDetail: ProductDetails = {...item, productName: product.productName, pricePerKg: product.pricePerKg, image: product.image, category: product.category};
        this.productDetails.push(productDetail);
        console.log(this.productDetails);
      });
    });
  }

}
