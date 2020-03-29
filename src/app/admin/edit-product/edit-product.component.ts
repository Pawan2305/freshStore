import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { SelectedProducts } from '../product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MainPageComponent } from '../main-page/main-page.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editProductForm:FormGroup;
  product: SelectedProducts;

  constructor( private productService: ProductsService,
            private formBuilder: FormBuilder,
            private mainPageComponent: MainPageComponent) {
              this.product = this.productService.getSelectedProduct();
              console.log(this.product);
   }

  ngOnInit(): void {
    this.product = this.productService.getSelectedProduct();
    console.log(this.product);
    const data = this.mainPageComponent.p;
    console.log(data);
    this.editProductForm = this.formBuilder.group({
      productName: [''],
      category: '',
      pricePerKg: null,
      marketPrice: null,
      totalQty : null
    });

    this.editProductForm.patchValue({
      productName : this.product.productName
    })
  }

  editProduct(){

  }

}
