import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { PaymentService } from '../payment.service';
import { ProductsCartService } from '../products-cart.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { ProductsService } from '../admin/products.service';
import { Products } from '../admin/product';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  deliveryCharge: number = 0;
  total: number = 0;
  isPaymentMethodSelected = true;
  paymentMethod = '';
  
  

  constructor(private addressServcie: AddressService,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    public productCartService: ProductsCartService,
    private router: Router,
    private orderService: OrdersService,
    private productService: ProductsService ) { }

  ngOnInit(): void {

    this.deliveryCharge = this.paymentService.deliveryCharges;
    this.total = this.paymentService.total;
  }

  onPaymentMethod($event){
    console.log($event);
    if( $event === "cash"){
      this.paymentMethod = "Cash On Delivery";
      this.isPaymentMethodSelected = true;
    }else{
      this.paymentMethod = "Card Payment";
      this.isPaymentMethodSelected = true;
    }

    this.paymentService.paymentMethod = this.paymentMethod;
  }

  onPay(){
    this.paymentService.addOrders().subscribe(res =>{
      if(res){
        console.log("Success");
        this.productCartService.products.forEach(element =>{
          this.paymentService.addOrderDetails(element).subscribe(result =>{
            if(result){
              const item = {
                productId: +element.productId
              }
              let originalProducts: Products;
              this.productService.getProductById(item).subscribe(res => {
                originalProducts = res;
                originalProducts.qtyRemain = (+originalProducts.qtyRemain)-(+element.quantity);
                console.log(this.productService.orginalProduct);
                this.productService.editProduct(originalProducts).subscribe((res)=>{
                  if(res=== true){
                    console.log("Product quantity deducted")  
                  }else{
                    console.log("Unable to add data");
                  }
                });
              });
              
            }else{
              console.log("Not Added");
            }
          });
          
          
        })
      }else{
        console.log("UnSuccess");
      }
    });
    
    this.orderService.isSelected = false;
    this.router.navigate(['bill']);
  }

}
