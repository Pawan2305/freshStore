import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Products } from '../product';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  products: Products[];

  constructor(private router: Router,
      private productService : ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (res: Products[]) =>{
        this.products = res;
      }
    );
  }

  onBack(){
    this.router.navigate(['main-page']);
  }


}
