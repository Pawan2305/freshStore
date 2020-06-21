import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CanvasJS from 'src/assets/canvasjs.min';

import { ProductsService } from '../products.service';
import { Products } from '../product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Orders } from 'src/app/orders';
import { OrdersService } from 'src/app/orders.service';

@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html',
  styleUrls: ['./sales-summary.component.css']
})
export class SalesSummaryComponent implements OnInit {

  products: TotalProducts[];
  rangeForm:FormGroup;
  orders: Orders[] = [];
  totalSale: number = 0;
  showGraphFlag: boolean = false;

  
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: TotalProducts[] = [];


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private orderService: OrdersService) { }

    performFilter(filterBy: string): TotalProducts[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: TotalProducts) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

  ngOnInit(): void {

    this.rangeForm = this.formBuilder.group({
      startDate: null,
      endDate: null
    });
    

    this.products = this.productService.product.map(prod =>{
      const qtySale = (+prod.totalQty)-(+prod.qtyRemain);
      console.log(qtySale);
      const totalAmt = qtySale * (+prod.pricePerKg);
      this.totalSale = this.totalSale + totalAmt;
      console.log(totalAmt);
      return {
        ...prod,
        totalQtySale: qtySale,
        totalEarnings: totalAmt
      }
    });  
    this.filteredProducts = this.products;
    this.products = this.products.filter(item => item.totalQtySale !== 0);
   
    console.log(this.products);  
  }

  onBack(){
    this.router.navigate(['admin']);
  }

  getOrders(){
    this.orders = [];
    let totalProduct: TotalProducts[] = [];
    this.totalSale = 0;
    console.log(this.rangeForm.value);
    let sDate = formatDate(this.rangeForm.get('startDate').value, 'dd-MM-yyyy', 'en-US', '+0530');
    let startDate: date = this.getDateFormat(sDate);

    let eDate = formatDate(this.rangeForm.get('endDate').value, 'dd-MM-yyyy', 'en-US', '+0530');
    let endDate: date = this.getDateFormat(eDate);

    console.log(startDate);
    console.log(endDate);

    this.orderService.getDeliveredOrders().subscribe(
      res =>{
        res.forEach(order => {
          console.log(order);
          const date = this.getDateFormat(order.deliveryDate);
          if((date.day >= startDate.day && date.month>= startDate.month && date.year >= startDate.year) && (date.day <= endDate.day && date.month <= endDate.month && date.year <= endDate.year)){
            console.log(order.orderId+" included in order list");
            this.orders.push(order);
          }
        });
        console.log(this.orders);
        if(this.orders.length === 0){

        }else{
          this.orders.forEach(order =>{
            this.orderService.getOrderDetails(order.orderId).subscribe(
              result =>{
                console.log(result);
                result.forEach(item =>{
                  let product: Products = this.productService.product.find(prod => prod.productId === item.productId);
                  console.log(product);
                  if(totalProduct.length === 0){
                    const totalQ = (+item.quantity);
                    const totAmt = totalQ * (+product.pricePerKg);
                    let p: TotalProducts = {...product, totalQtySale: totalQ, totalEarnings: totAmt };
                    totalProduct.push(p);
                    console.log(totalProduct);
                  }else{
                    let exist = totalProduct.find(prod => prod.productId === item.productId);
                    if(exist){
                      totalProduct = totalProduct.map(prod =>{
                        if(prod.productId === item.productId){
                          const totalQ = prod.totalQtySale + (+item.quantity);
                          const totAmt = totalQ * (+product.pricePerKg);
                          let p: TotalProducts = {...product, totalQtySale: totalQ, totalEarnings: totAmt };
                          return p;
                        }else{
                          return prod;
                        }
                      });
                      console.log(totalProduct);
                    }else{
                      const totalQ = (+item.quantity);
                      const totAmt = totalQ * (+product.pricePerKg);
                      let p: TotalProducts = {...product, totalQtySale: totalQ, totalEarnings: totAmt };
                      totalProduct.push(p);
                      console.log(totalProduct);
                    }
                  }

                });
                this.totalSale =0;
                console.log(totalProduct);
                totalProduct.forEach(item =>  this.totalSale = this.totalSale + item.totalEarnings );
                this.products = totalProduct;

            });
          });
        }
        
      }
    );
  }


  getDateFormat(date: string): date{
    let Date: date ={
      day: +(date.substring(0, 2)),
      month: +(date.substring(3,5)),
      year: +(date.substring(6,10))
    }

    return Date;
  }

  showGraph(){

    this.showGraphFlag = !this.showGraphFlag;
    let dataPoints = [];
    this.products.forEach(item =>{
      let data: {y: number, label: string} = {y: item.totalQtySale, label: item.productName};
      dataPoints.push(data);
    })

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: {
        text: "Product Sales chart"
      },
      axisY: {
        title: "Total Quantity Sale (Kg)"
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    });

    chart.render();
  }

}

export interface TotalProducts extends Products{
  totalQtySale: number;
  totalEarnings: number;
}

export interface date{
  day: number;
  month: number;
  year: number;
}
