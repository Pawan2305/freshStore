import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    const log =this.loginService.getIsLogin();
    if(log){
      console.log("Admin is logged in");
    }else{
      console.log("User is logged In");
    }
  }

}
