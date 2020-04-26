import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsCartService } from '../products-cart.service';
import { CartProducts } from '../admin/product';
import { Address } from '../address';
import { AddressService } from '../address.service';
import { LoginService } from '../login.service';
import { Login } from '../login/login';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  addAddressForm:FormGroup;
  products: CartProducts[];
  address: Address[] = [];
  total: number = 0;
  totalItem = 0;
  anotherAddress = false;
  dType = 'Standard';
  deliveryCharge = 50;
  isAddressSelected = false;
  discount: number = 0;

  constructor(public productCartService: ProductsCartService,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private loginService: LoginService,
    private router: Router,
    private paymentService: PaymentService) { }

  ngOnInit(): void {

    /*if(!this.loginService.isUserLogin){
      this.router.navigate(['main-page']);
    }*/

    this.addAddressForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      mobileNo: [''],
      zip: null
    });
    const email: Login ={
      loginId: this.loginService.customerId,
      pswd: ""
    }

    this.addressService.getAddress(email).subscribe(res=>{
        console.log(res);
        this.address = res;
    });

    this.total = this.productCartService.subTotal;
    
    this.products = this.productCartService.products;
   
    this.products.forEach(element =>{
      this.totalItem = this.totalItem+1;
    });
    this.total = this.total+ this.deliveryCharge;
  }

  addAnotherAddress(){
    if(!this.anotherAddress){
      this.anotherAddress = true;
    }else{
      this.anotherAddress = false;
    }
   
  }

  addAddress(){
    console.log(this.addAddressForm.value);
    let address: Address = {
      customerEmail: this.loginService.customerId,
      firstName: this.addAddressForm.get('firstName').value,
      lastName:this.addAddressForm.get('lastName').value,
      address1: this.addAddressForm.get('address1').value,
      address2: this.addAddressForm.get('address2').value,
      city: this.addAddressForm.get('city').value,
      state: this.addAddressForm.get('state').value,
      mobileNo: this.addAddressForm.get('mobileNo').value,
      zipCode: this.addAddressForm.get('zip').value,
      addressId: 0
    }
    this.addressService.addAddress(address).subscribe((res)=>{
      if(res=== true){
        //window.alert("Product Added");
        this.addAddressForm.reset();
        const email: Login ={
          loginId: this.loginService.customerId,
          pswd: ""
        }
        
        this.addressService.getAddress(email).subscribe(res=>{
          console.log(res);
          this.address = res;
        });
        
        console.log(address);
      }else{
        console.log("Unable to add data");
      }
    });
  }

  deliveryType($event){
    this.total = this.total - this.deliveryCharge;
    if($event === "fast"){
      this.dType = "Fast";
      this.deliveryCharge = 100;   
    }else{
      this.dType = "Standard";
      this.deliveryCharge = 50;
    }
    this.paymentService.deliveryType = this.dType;
    this.total = this.total + this.deliveryCharge;
    this.paymentService.deliveryCharges = this.deliveryCharge;
    this.paymentService.total = this.total;
  }

  onDeleteAddress(address: Address){
    this.addressService.deleteAddress(address.addressId).subscribe(
      res =>{
        if(res){
          const email: Login ={
            loginId: this.loginService.customerId,
            pswd: ""
          }
          this.addressService.getAddress(email).subscribe(res=>{
            console.log(res);
            this.address = res;
          });  
        }else{
          console.log("Something is wrong");
        }
      }
    );
  }

  selectedAddress(address: Address){
    this.addressService.deliveryAddress = address;
    this.isAddressSelected = true;
  }

}
