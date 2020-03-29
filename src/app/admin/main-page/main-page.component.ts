import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Products, SelectedProducts } from '../product';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  constructor(private router: Router,
      private productService : ProductsService,
      private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.editProductForm = this.formBuilder.group({
      productName: [''],
      category: '',
      pricePerKg: null,
      marketPrice: null,
      totalQty : null
    });

    this.productService.getAllProducts().subscribe(
      (res: Products[]) =>{
        this.products = res;
        this.selectedProduct = this.products.map(x =>( <SelectedProducts>{ ...x, selected: false}))
        console.log(this.selectedProduct);
        console.log(this.products);
      }
    );

  }

  onBack(){
    this.router.navigate(['main-page']);
  }

  onDeleteYes(){
    this.productService.deleteProduct(+this.p.productId).subscribe(
      (res: boolean) =>{
        if(res){
          console.log("Product Deleted");
          window.location.reload();
        }
        else{
          console.log("Product Not deleted");
        }
      }
    );
  }

  selectProduct( product: SelectedProducts){
    product.selected = !product.selected;
    this.selectedProduct = this.selectedProduct.map(x => {
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
    this.editProductForm.patchValue({
      productName : this.p.productName,
      category:  this.p.category,
      pricePerKg: this.p.pricePerKg,
      marketPrice: this.p.marketPrice,
      totalQty: this.p.totalQty
    })
  }

  editProduct(){
    console.log(this.editProductForm.value);
    let product: Products = new Products();
    product.productId = this.p.productId;
    product.productName = this.editProductForm.get('productName').value;
    product.category = this.editProductForm.get('category').value;
    product.pricePerKg = this.editProductForm.get('pricePerKg').value;
    product.marketPrice = this.editProductForm.get('marketPrice').value;
    product.totalQty = this.editProductForm.get('totalQty').value;
    product.qtyRemain = this.editProductForm.get('totalQty').value;
    product.image = '/assets/image/apple.jpg';
    console.log(product);
    this.productService.editProduct(product).subscribe((res)=>{
      if(res=== true){
        //window.alert("Product Added");
        this.editProductForm.reset();
        window.location.reload();
      }else{
        console.log("Unable to add data");
      }
    });
  }

}
