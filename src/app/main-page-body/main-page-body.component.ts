import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../admin/products.service';
import { Products } from '../admin/product';

@Component({
  selector: 'app-main-page-body',
  templateUrl: './main-page-body.component.html',
  styleUrls: ['./main-page-body.component.css']
})
export class MainPageBodyComponent implements OnInit {

  count = [0,1,2];
  products: Products[];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (res: Products[]) =>{
        this.products = res;
        console.log(this.products);
        this.products.forEach(element =>{
          this.productService.getImage(element.image).subscribe(image => {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
               element.image = <string>reader.result;
            }, false);
            if (image) {
               reader.readAsDataURL(image);
            }
          }, error => {
            console.log(error);
          });
        });

        console.log(this.products);
      }
    );

  }

}
