import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Orders, OrderDetails, ProductDetails } from '../orders';
import { ProductsService } from '../admin/products.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: Orders[];
  orderDetails: ProductDetails[] =[];
  constructor(private orderService: OrdersService,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(res =>{
      this.orders = res;
      console.log(this.orders);
      this.orders.forEach(element =>{
        this.orderService.getOrderDetails(element.orderId).subscribe(res =>{
          res.forEach(item => {
            let product = this.productService.product.find(p => p.productId === item.productId)
            const productDetail: ProductDetails=({
              ...item,
              productName: product.productName,
              pricePerKg: product.pricePerKg,
              image: product.image
            });
            this.orderDetails.push(productDetail);
          });
        });
      });
      console.log(this.orderDetails);
    });
    console.log(this.productService.product);
  }

}
