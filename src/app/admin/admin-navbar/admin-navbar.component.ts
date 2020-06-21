import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor( private router: Router,
    public loginService: LoginService,
    private productService: ProductsService) { }

  ngOnInit(): void {
  }

  onLiveOrders(){
    this.router.navigate(['admin/live-orders']);
  }

  sideBarToggle(){
    this.loginService.isShowSideBar = !this.loginService.isShowSideBar;
    if(this.loginService.isShowSideBar === false){
      this.loginService.padding = 50;
      this.loginService.layoutWidth = 1300
    }else{
      this.loginService.padding =0;
      this.loginService.layoutWidth = 1135
    }
  }

  onLogout(){
    this.loginService.isUserLogin = false;
    this.loginService.username = null;
    this.productService.isAdmin = false;
  
    this.router.navigate(['/home', 'store']);
  }

}
