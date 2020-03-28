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

  constructor(private router: Router,
        private formBuilder: FormBuilder,
        private productService: ProductsService) { }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      productName: [''],
      category: '',
      pricePerKg: null,
      marketPrice: null,
      totalQty : null
    });
  }

  addProduct(){
    console.log(this.addProductForm.value);
    this.product.productName = this.addProductForm.get('productName').value;
    this.product.category = this.addProductForm.get('category').value;
    this.product.pricePerKg = this.addProductForm.get('pricePerKg').value;
    this.product.marketPrice = this.addProductForm.get('marketPrice').value;
    this.product.totalQty = this.addProductForm.get('totalQty').value;
    this.product.qtyRemain = this.addProductForm.get('totalQty').value;
    this.product.image = '/assets/image/apple.jpg';
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe((res)=>{
      if(res=== true){
        window.alert("Product Added");
        this.addProductForm.reset();
      }else{
        console.log("Unable to add data");
      }
  });
  }
}
