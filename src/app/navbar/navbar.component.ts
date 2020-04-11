import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean;

  constructor(public loginService: LoginService,
    private router: Router) { }

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
  }

  onHome(){
    this.loginService.category = "0";
  }

  onLogout(){
    this.loginService.isUserLogin = false;
    this.loginService.username = null;
    this.router.navigate(['/home', 'store']);
  }

}
