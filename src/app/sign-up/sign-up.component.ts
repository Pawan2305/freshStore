import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { signup } from './sign-up';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  signup = new signup();

  constructor(private formBuilder: FormBuilder,
              private signUpService: SignUpService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: [''],
      phoneNo: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  save() {
    console.log('Saved: ' + JSON.stringify(this.signupForm.value));
    this.signup.name = this.signupForm.get('name').value;
    this.signup.email = this.signupForm.get('email').value;
    this.signup.phoneNo = this.signupForm.get('phoneNo').value;
    this.signup.password = this.signupForm.get('password').value;
    console.log(this.signup);
    this.signUpService.signup(this.signup).subscribe((res)=>{
        if(res=== true){
          window.alert("Signed up go to login page");
          this.signupForm.reset();
        }else{
          console.log("Unable to add data");
        }
    });
   
  }  
}
