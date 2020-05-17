import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Products, SelectedProducts } from '../product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  products: Products[];
  selectedProduct: SelectedProducts[];
  p: SelectedProducts;
  editProductForm:FormGroup;
  disableBtn = true;
  imageWidth = 100;
  imageMargin = 5;
  imageToShow: any;
  isImageLoading: boolean;
  imageUrl: string;
  show: string = '';
  message: string;

  fileToUpload: File = null;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.selectedProduct;
  }

  filteredProducts: SelectedProducts[] = [];


  constructor(private router: Router,
      private productService : ProductsService,
      private formBuilder: FormBuilder,
      private loginService: LoginService ) { }

  performFilter(filterBy: string): SelectedProducts[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.selectedProduct.filter((product: SelectedProducts) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.editProductForm = this.formBuilder.group({
      productName: [''],
      category: '',
      pricePerKg: null,
      marketPrice: null,
      totalQty : null,
      image: null
    });

    this.getAllProducts();
    
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      (res: Products[]) =>{
        this.products = res;
        this.selectedProduct = this.products.map(x =>( <SelectedProducts>{ ...x, selected: false}))
        console.log(this.selectedProduct);
        console.log(this.products);
        this.selectedProduct.forEach(element =>{
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

        this.filteredProducts = this.selectedProduct;
      }
    );
  }

  onRefresh(){
   this.getAllProducts();
  }

  onDeleteYes(){
    this.productService.deleteProduct(+this.p.productId).subscribe(
      (res: boolean) =>{
        if(res){
          console.log("Product Deleted");
          this.message = this.p.productName+" deleted";
          this.show = 'show';
          setTimeout(()=>{    
            this.show = ' ';
          }, 3000);
        }
        else{
          console.log("Product Not deleted");
        }
      }
    );
  }

  selectProduct( product: SelectedProducts){
    product.selected = !product.selected;
    this.selectedProduct = this.filteredProducts.map(x => {
      if(x.productId !== product.productId){
        x.selected = false;
        return x;
      }
      return x;
    })
    console.log(product);
    this.p = product;
    this.disableBtn = false;

  }

  onEdit(){
    console.log(this.p);
    this.imageToShow = this.p.image;
    this.editProductForm.patchValue({
      productName : this.p.productName,
      category:  this.p.category,
      pricePerKg: this.p.pricePerKg,
      marketPrice: this.p.marketPrice,
      totalQty: this.p.totalQty
    })
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileToUpload = file;
    }
  }

  editProduct(){
    const cartItem = {
      productId: +this.p.productId
    }
    console.log(this.editProductForm.value);
    let product: Products = new Products();
    product.productId = this.p.productId;
    product.productName = this.editProductForm.get('productName').value;
    product.category = this.editProductForm.get('category').value;
    product.pricePerKg = this.editProductForm.get('pricePerKg').value;
    product.marketPrice = this.editProductForm.get('marketPrice').value;
    product.totalQty = this.editProductForm.get('totalQty').value;
    product.qtyRemain =  (+product.totalQty) - ((+this.p.totalQty)-(+this.p.qtyRemain));
    if(this.fileToUpload){ 
      const formData:FormData = new FormData();
      formData.append('file', this.fileToUpload);
      this.productService.uploadImage(formData)
        .subscribe((res) =>{
          if(res){
              this.imageUrl= res;
              product.image = res;
              console.log(product);
              this.productService.editProduct(product).subscribe((res)=>{
                if(res=== true){
                  
                  this.editProductForm.reset();
                  this.message = product.productName+" edited";
                  this.show = 'show';
                  setTimeout(()=>{    
                    this.show = ' ';
                  }, 3000);
                  this.getAllProducts();
                }else{
                  console.log("Unable to add data");
                }
              });
          }else{
             alert("Image Upload failed");
          }
      });
    }else{
      let originalProducts: Products;
      this.productService.getProductById(cartItem).subscribe(res => {
        originalProducts = res;
        product.image = originalProducts.image;
        this.productService.editProduct(product).subscribe((res)=>{
          if(res=== true){
          
            this.editProductForm.reset();
            this.message = product.productName+" edited.";
            this.show = 'show';
            this.getAllProducts();
            setTimeout(()=>{    
              this.show = ' ';
            }, 3000);
          }else{
            console.log("Unable to add data");
          }
        });
      });
      
    }
  }

}
