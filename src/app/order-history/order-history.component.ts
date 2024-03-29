import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Orders, OrderDetails, ProductDetails } from '../orders';
import { ProductsService } from '../admin/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: OrderItems[];
  orderDetails: ProductDetails[] =[];
  isShowDetails: boolean = false;
  orderId;
  imageWidth = 70;
  imageMargin = 2;

  constructor(private orderService: OrdersService,
    private productService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(res =>{
      this.orders = res;
      console.log(this.orders);
      this.orders.forEach(element =>{
        let count = 0;
        this.orderService.getOrderDetails(element.orderId).subscribe(res =>{
          res.forEach(item => {
            count = count +1;
            let product = this.productService.product.find(p => p.productId === item.productId)
            const productDetail: ProductDetails=({
              ...item,
              productName: product.productName,
              pricePerKg: product.pricePerKg,
              category: product.category,
              image: product.image
            });
            this.orderDetails.push(productDetail);
          });
          element.items = count;
        });

      });
      console.log(this.orderDetails);
    });
    console.log(this.productService.product);
  }

  onViewDetails(order: Orders){
    if(order.orderId === this.orderId){
      this.isShowDetails = false;
      this.orderId = 0;
    }else{
      this.isShowDetails = true;
      this.orderId = order.orderId;
    }  
  }

  onTrack(orderId){
    this.orderService.trackOrderId = orderId;
    this.router.navigate(['track-order']);
  }

  onViewInvoice(order){
    this.orderService.selectedOrderDetails = [];
    console.log(order);
    this.orderService.selectedOrder = order;
    this.orderDetails.forEach(element =>{
      if(element.orderId === order.orderId){
        this.orderService.selectedOrderDetails.push(element);
      }
    });
    console.log(this.orderService.selectedOrderDetails);
    this.orderService.isSelected = true;
    this.router.navigate(['bill']);
  }
}

export interface OrderItems extends Orders{
  items?: number;
}