import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsCartService } from '../products-cart.service';
import { ProductsService } from '../admin/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean;
  modal="";

  constructor(public loginService: LoginService,
    private router: Router,
    private productCartService: ProductsCartService,
    private productService: ProductsService) { }

  ngOnInit(): void {
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
    this.modal = "modal"
    this.router.navigate(['/track-order']);
  }

}
