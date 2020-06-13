import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/orders.service';
import { LoginService } from 'src/app/login.service';
import { Login } from 'src/app/login/login';
import { Orders, OrderDetails, ProductDetails } from 'src/app/orders';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Products } from '../product';
import { Address } from 'src/app/address';
import { AddressService } from 'src/app/address.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-live-product',
  templateUrl: './live-product.component.html',
  styleUrls: ['./live-product.component.css']
})
export class LiveProductComponent implements OnInit {

  cancelForm: FormGroup;
  orders: Orders[];
  cancelOrder: Orders;
  orderDetails: OrderDetails[];
  productDetails: ProductDetails[] = [];
  show: string = '';
  message: string;
  expanded: boolean = false;
  address: Address;
  orderId;
  isImageLoading: boolean;
  imageWidth = 70;
  imageMargin = 2;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredOrders = this.listFilter ? this.performFilter(this.listFilter) : this.orders;
  }

  filteredOrders: Orders[] = [];


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private orderService: OrdersService,
    private loginService: LoginService,
    private productService: ProductsService,
    private addressService: AddressService) { }

    performFilter(filterBy: string): Orders[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.orders.filter((order: Orders) =>
        order.orderId.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

  ngOnInit(): void {
    this.cancelForm = this.formBuilder.group({
      reason: ''
    });

    this.orderService.getPlacedOrders().subscribe(res=>
    {
      console.log(res);
      this.orders = res;
      this.orders.forEach(item =>{
        const log: Login ={
          loginId: item.customerEmail,
          pswd: ""
        }
        this.loginService.getUserName(log).subscribe(user =>{
          item.customerName = user.name;
          item.phone = user.phoneNo.toString();
        });
      });
      this.filteredOrders = this.orders;
    });
  }

  onShip(order: Orders){
    let today = new Date();
    let jstToday = formatDate(today, 'dd-MM-yyyy', 'en-US', '+0530');
    console.log(jstToday); 
    order.shipDate = jstToday;
    order.deliveryDate = "";
    order.cancelDate = "";
    order.cancelReason ="";
    order.orderStatus = "Shipped";
    this.orderService.updateOrderStatus(order).subscribe(res => {
      if(res){
        console.log("Order Updated");
        this.orders.forEach(item =>{
          if(item.orderId === order.orderId){
            item = order;
          }
        });
      }
    });

    this.message ="Order No-"+ order.orderId+" is shipped.";
    this.show = 'show';
    setTimeout(()=>{    
      this.show = ' ';
    }, 3000);
  }

  onDelivered(order: Orders){
    let today = new Date();
    let jstToday = formatDate(today, 'dd-MM-yyyy', 'en-US', '+0530');
    console.log(jstToday); 
    order.deliveryDate = jstToday;
    order.orderStatus = "Delivered";
    order.cancelDate = "";
    order.cancelReason ="";
    this.orderService.updateOrderStatus(order).subscribe(res => {
      if(res){
        console.log("Order Updated");
        const index = this.orders.indexOf(order);
        console.log(index);
        if (index > -1) {
          this.orders.splice(index, 1);
        }
      }
    });

    this.message = "Order No-"+ order.orderId+" is delivered. Go to delivered orders page for details.";
    this.show = 'show';
    setTimeout(()=>{    
      this.show = ' ';
    }, 3000);
  }

  onCancel(order: Orders){
    this.cancelOrder = order;
  }

  onCancelOrder(order: Orders){
    console.log(order);
    console.log(this.cancelForm.get("reason").value);
    let today = new Date();
    let jstToday = formatDate(today, 'dd-MM-yyyy', 'en-US', '+0530');
    console.log(jstToday); 
    this.cancelOrder.orderStatus = "Cancelled";
    this.cancelOrder.cancelDate = jstToday;
    this.cancelOrder.cancelReason = this.cancelForm.get("reason").value;
    this.orderService.updateOrderStatus(this.cancelOrder).subscribe(res => {
      if(res){
        console.log("Order Updated");
        const index = this.orders.indexOf(this.cancelOrder);
        console.log(index);
        if (index > -1) {
          this.orders.splice(index, 1);
        }
      }
    });

    this.orderService.getOrderDetails(this.cancelOrder.orderId).subscribe(
      res =>{
        this.orderDetails = res;
        console.log(this.orderDetails);
        this.orderDetails.forEach(item =>{
          const cartItem = {
            productId: +item.productId
          }
          let product: Products;
          this.productService.getProductById(cartItem).subscribe(res => {
            product = res;
            product.qtyRemain = (+product.qtyRemain) + (+item.quantity);
            this.productService.editProduct(product).subscribe((res)=>{
              if(res=== true){
              //window.alert("Product Added");
                console.log("product qunatity added");
                //window.location.reload();
              }else{
              console.log("Unable to add data");
              }
            });
          });
        });

      }
    );

    this.message = "Order No-"+order.orderId+" is Cancellec. Go to cancelled orders page for details.";
    this.show = 'show';
    setTimeout(()=>{    
      this.show = ' ';
    }, 3000);
    
  }

  onShowDetails(order: Orders){
    this.address = null;
    this.productDetails = [];
    this.orderId = order.orderId;
    console.log(order);
    const email: Login ={
      loginId: order.customerEmail,
      pswd: ""
    }
    this.addressService.getAddress(email).subscribe(
      res =>{
        this.address = res.find(address => address.addressId === order.addressId);
        console.log(this.address);
      }
    );

    this.orderService.getOrderDetails(order.orderId).subscribe(result =>{
      result.forEach(item =>{
        
        this.productService.getAllProducts().subscribe(
          res => {
            let product: Products = res.find(prod => prod.productId === item.productId);
            let productDetail: ProductDetails = {...item, productName: product.productName, pricePerKg: product.pricePerKg, image: product.image, category: product.category};
            this.productService.getImage(product.image).subscribe(image => {
              let reader = new FileReader();
              reader.addEventListener("load", () => {
                productDetail.image = <string>reader.result;
                this.productDetails.push(productDetail);
              }, false);
              if (image) {
                reader.readAsDataURL(image);
              }
            }, error => {
              console.log(error);
            });
          }
        );
        
        
        console.log(this.productDetails);
      });
    });
  }

}
