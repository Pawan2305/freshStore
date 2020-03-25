import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Login } from './login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  login: Login[];
  error = '';

  log = new Login('','');
  
  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginId: ['', Validators.required],
      password: ''
    });
  }

  onLogin(){
    this.loginService.getAll().subscribe(
      (res: Login[]) => {
        this.login = res;
        this.login.forEach(element => {
          if(element.loginId === this.loginForm.get('loginId').value && element.pswd === this.loginForm.get('password').value){
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
