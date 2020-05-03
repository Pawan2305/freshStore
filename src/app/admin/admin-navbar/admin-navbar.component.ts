import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor( private router: Router,
    public loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLiveOrders(){
    this.router.navigate(['admin/live-orders']);
  }

  onLogout(){
    this.loginService.isUserLogin = false;
    this.loginService.username = null;
   
    this.router.navigate(['/home', 'store']);
  }

}
