import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
    
  constructor(private productServcie: ProductsService,
    private loginService: LoginService) { }

  ngOnInit(){

  }

}
