import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'freshStore';
  
  constructor(private router: Router,
    public loginService: LoginService){

  }

  onLogout(){
    this.loginService.isUserLogin = true;
    this.loginService.username = null;
   
    this.router.navigate(['/home', 'store']);
  }
}
