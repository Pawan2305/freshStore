import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../admin/products.service';
import { Products } from '../admin/product';
import { LoginService } from '../login.service';
import { ProductsCartService } from '../products-cart.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-page-body',
  templateUrl: './main-page-body.component.html',
  styleUrls: ['./main-page-body.component.css']
})
export class MainPageBodyComponent implements OnInit {

  count = [0,1,2];
  products: Products[];
  quantity = new FormControl();
  isShow = false;
  show: string = '';
  message: string;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  filteredProducts: Products[] = [];

  constructor(private productService: ProductsService,
    public loginService: LoginService,
    private productCartService: ProductsCartService) { }

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
        this.filteredProducts = this.products
        console.log(this.products);
      }
    );

  }

  performFilter(filterBy: string): Products[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Products) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  addToCart(product) {
    this.productCartService.addToCart(product);
    console.log("Added to cart");
    //window.alert('Your product has been added to the cart!');
    this.message = product.productName+" added to cart.";
    this.show = 'show';
    setTimeout(()=>{    
      this.show = ' ';
    }, 3000);
  }

  myFunction(){
    this.isShow = true;
    this.show = "show";
    setTimeout(function(){ 
      this.isShow = false;
      this.show = " ";
    }, 3000);
  }

}

export interface CartProduct extends Products {
  quantity: number;
}
