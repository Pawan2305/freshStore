import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsCartService } from '../products-cart.service';
import { ProductsService } from '../admin/products.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean;
  modal="";
  trackForm:FormGroup;

  constructor(public loginService: LoginService,
    private router: Router,
    private productCartService: ProductsCartService,
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private orderService: OrdersService) { }

  ngOnInit(): void {
    this.trackForm = this.formBuilder.group({
      orderId: ''
    });

    const log =this.loginService.getIsLogin();
    if(log==="admin"){
      this.isLogin = false;
    }else{
      console.log("User is logged In");
      this.isLogin = true;
    }
  }

  onFruit(){
    console.log("fruit");
    this.loginService.category = "Fruit";
    this.router.navigate(['/home','Fruit']);
  }

  onHome(){
    this.loginService.category = "0";
  }

  onLogout(){
    this.loginService.isUserLogin = false;
    this.loginService.username = null;
    this.productCartService.products =[];
    this.router.navigate(['/home', 'store']);
  }

  onTrackOrderSubmit(){
    this.orderService.trackOrderId = +(this.trackForm.get('orderId').value);
    this.modal = "modal"
    this.router.navigate(['/track-order']);
  }

}
