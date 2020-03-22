import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login[];
  error = '';

  log = new Login('','');
  
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLogin(f){
    this.loginService.getAll().subscribe(
      (res: Login[]) => {
        this.login = res;
        this.login.forEach(element => {
          if(element.loginId === this.log.loginId && element.pswd === this.log.pswd){
            window.alert("Welcome "+element.loginId);
            console.log("Login Successfull");
          }
        });
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
