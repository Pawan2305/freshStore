import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Products } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm:FormGroup;
  product: Products = new Products();
  fileToUpload: File = null;
  imageUrl: String;
  show: string = '';
  message: string;

  constructor(private router: Router,
        private formBuilder: FormBuilder,
        private productService: ProductsService) { }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      productName: [''],
      category: '',
      pricePerKg: null,
      marketPrice: null,
      totalQty : null,
      image: null
    });
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileToUpload = file;
    }
  }

  addProduct(){
    console.log(this.addProductForm.value);
    this.product.productName = this.addProductForm.get('productName').value;
    this.product.category = this.addProductForm.get('category').value;
    this.product.pricePerKg = this.addProductForm.get('pricePerKg').value;
    this.product.marketPrice = this.addProductForm.get('marketPrice').value;
    this.product.totalQty = this.addProductForm.get('totalQty').value;
    this.product.qtyRemain = this.addProductForm.get('totalQty').value;
    const formData:FormData = new FormData();
    formData.append('file', this.fileToUpload);
    this.productService.uploadImage(formData)
     .subscribe((res) =>{
        if(res){
        
          this.imageUrl= res;
          this.product.image = res;
          console.log(this.product);
          this.productService.addProduct(this.product).subscribe((res)=>{
            if(res=== true){
              //window.alert("Product Added");
              this.addProductForm.reset();
              console.log(this.product);
              this.message = this.product.productName+" added.";
              this.show = 'show';
              setTimeout(()=>{    
                this.show = ' ';
              }, 3000);
            }else{
              console.log("Unable to add data");
            }
          });
        }else{
          alert("Image Upload failed");
        }
    });
  }
}
