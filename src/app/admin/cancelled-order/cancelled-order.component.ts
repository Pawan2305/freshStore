import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/orders.service';
import { Orders } from 'src/app/orders';
import { Login } from 'src/app/login/login';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-cancelled-order',
  templateUrl: './cancelled-order.component.html',
  styleUrls: ['./cancelled-order.component.css']
})
export class CancelledOrderComponent implements OnInit {

  orders: Orders[];

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredOrders = this.listFilter ? this.performFilter(this.listFilter) : this.orders;
  }

  filteredOrders: Orders[] = [];

  constructor(private orderService: OrdersService,
    private loginService: LoginService,
    private router: Router) { }

    performFilter(filterBy: string): Orders[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.orders.filter((order: Orders) =>
        order.orderId.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

  ngOnInit(): void {
    this.orderService.getCancelledOrders().subscribe(res=>
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
        this.filteredOrders = this.orders;
      });
  }

  onBack(){
    this.router.navigate(['admin']);
  }

}
