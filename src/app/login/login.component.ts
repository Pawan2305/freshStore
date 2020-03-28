import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Login } from './login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: boolean= false;

  login: Login[];
  error = '';

  log = new Login('','');
  
  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(){
    this.loginService.getAll().subscribe(
      (res: Login[]) => {
        this.login = res;
        this.login.forEach(element => {
          if(element.loginId === this.loginForm.get('loginId').value && element.pswd === this.loginForm.get('password').value){
            if(element.loginId === "admin"){
              console.log("admin");
              this.loginForm.reset();
              window.alert("Welcome "+element.loginId);
              this.router.navigate(['admin/add-product']);
            }else{
              console.log("Login Successfull");
              this.loginForm.reset();
              window.alert("Welcome "+element.loginId);
              this.router.navigate(['main-page']);
            }
          }else{
           this.loginError = true;
          }
        });
      },
      (err) => {
        this.error = err;
      }
    );

    if(this.loginError){
      window.alert("Email Id and password did not match.\nTry Again!!!");
    }
  }

}
