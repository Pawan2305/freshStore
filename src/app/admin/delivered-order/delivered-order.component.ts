import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/orders.service';
import { Orders } from 'src/app/orders';
import { Login } from 'src/app/login/login';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-delivered-order',
  templateUrl: './delivered-order.component.html',
  styleUrls: ['./delivered-order.component.css']
})
export class DeliveredOrderComponent implements OnInit {

  orders: Orders[];

  constructor(private router: Router,
    private orderService: OrdersService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.orderService.getDeliveredOrders().subscribe(res=>
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

}
