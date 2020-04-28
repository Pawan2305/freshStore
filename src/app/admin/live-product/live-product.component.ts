import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/orders.service';
import { LoginService } from 'src/app/login.service';
import { Login } from 'src/app/login/login';
import { Orders } from 'src/app/orders';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-live-product',
  templateUrl: './live-product.component.html',
  styleUrls: ['./live-product.component.css']
})
export class LiveProductComponent implements OnInit {

  cancelForm: FormGroup;
  orders: Orders[];
  cancelOrder: Orders;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private orderService: OrdersService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.cancelForm = this.formBuilder.group({
      reason: ''
    });

    this.orderService.getPlacedOrders().subscribe(res=>
    {
      console.log(res);
      this.orders = res;
      this.orders.forEach(item =>{
        const log: Login ={
          loginId: item.customerEmail,
          pswd: ""
        }
        this.loginService.getUserName(log).subscribe(user =>{
          item.customerName = user.name;
          item.phone = user.phoneNo.toString();
        });
      });
      
    });
  }

  onBack(){
    this.router.navigate(['admin']);
  }

  onShip(order: Orders){
    let today = new Date();
    let jstToday = formatDate(today, 'dd-MM-yyyy', 'en-US', '+0530');
    console.log(jstToday); 
    order.shipDate = jstToday;
    order.deliveryDate = "";
    order.cancelDate = "";
    order.cancelReason ="";
    order.orderStatus = "Shipped";
    this.orderService.updateOrderStatus(order).subscribe(res => {
      if(res){
        console.log("Order Updated");
        this.orders.forEach(item =>{
          if(item.orderId === order.orderId){
            item = order;
          }
        });
      }
    });
  }

  onDelivered(order: Orders){
    let today = new Date();
    let jstToday = formatDate(today, 'dd-MM-yyyy', 'en-US', '+0530');
    console.log(jstToday); 
    order.deliveryDate = jstToday;
    order.orderStatus = "Delivered";
    order.cancelDate = "";
    order.cancelReason ="";
    this.orderService.updateOrderStatus(order).subscribe(res => {
      if(res){
        console.log("Order Updated");
        const index = this.orders.indexOf(order);
        console.log(index);
        if (index > -1) {
          this.orders.splice(index, 1);
        }
      }
    });
  }

  onCancel(order: Orders){
    this.cancelOrder = order;
  }

  onCancelOrder(order: Orders){
    console.log(order);
    console.log(this.cancelForm.get("reason").value);
    let today = new Date();
    let jstToday = formatDate(today, 'dd-MM-yyyy', 'en-US', '+0530');
    console.log(jstToday); 
    this.cancelOrder.orderStatus = "Cancelled";
    this.cancelOrder.cancelDate = jstToday;
    this.cancelOrder.cancelReason = this.cancelForm.get("reason").value;
    this.orderService.updateOrderStatus(this.cancelOrder).subscribe(res => {
      if(res){
        console.log("Order Updated");
        const index = this.orders.indexOf(this.cancelOrder);
        console.log(index);
        if (index > -1) {
          this.orders.splice(index, 1);
        }
      }
    });
  }

}
