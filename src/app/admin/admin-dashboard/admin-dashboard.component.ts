import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Products } from '../product';
import * as CanvasJS from 'src/assets/canvasjs.min';
import { OrdersService } from 'src/app/orders.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  products: Products[];
  imageWidth = 100;
  imageMargin = 2;
  dataPoints = [];
  totalProducts = 0;
  totalOrders = 0;
  totalCustomers = -1;
  totalIncome = 0;
  income: Income[] = [
    {month: 1, monthName: "Jan", amount: 0 },
    {month: 2, monthName: "Feb", amount: 0 },
    {month: 3, monthName: "Mar", amount: 0 },
    {month: 4, monthName: "Apr", amount: 0 },
    {month: 5, monthName: "May", amount: 0 },
    {month: 6, monthName: "Jun", amount: 0 },
    {month: 7, monthName: "Jul", amount: 0 },
    {month: 8, monthName: "Aug", amount: 0 },
    {month: 9, monthName: "Sep", amount: 0 },
    {month: 10, monthName: "Oct", amount: 0 },
    {month: 11, monthName: "Nov", amount: 0 },
    {month: 12, monthName: "Dec", amount: 0 }
  ];

  constructor( private productService : ProductsService,
    private orderService: OrdersService,
    private loginService: LoginService) { }

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe(
      (res: Products[]) =>{
        this.products = res;
        console.log(this.products);
        this.products.forEach(element =>{
          this.totalProducts = this.totalProducts+1;
          const totalQtySale = (+element.totalQty)-(+element.qtyRemain);
          let data: {y: number, label: string} = {y: totalQtySale, label: element.productName};
          this.dataPoints.push(data);
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
        let chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          exportEnabled: true,
          theme: "light2",
          axisY: {
            title: "Total Quantity Sale (Kg)"
          },
          axisX:{
            title: "Products"
          },
          data: [{
            type: "column",
            dataPoints: this.dataPoints
          }]
        });
    
        chart.render();
      }
    );

    this.getTotalOrders();
    this.getTotalCustomers();
    
  }

  getTotalOrders(){
    this.orderService.getDeliveredOrders().subscribe(res =>{
      res.forEach(order =>{
        this.totalOrders = this.totalOrders + 1;
        this.totalIncome = this.totalIncome + (+order.totalAmt);
        const date = this.getDateFormat(order.deliveryDate);
        this.income.forEach(inc =>{
          if(inc.month === date.month){
            inc.amount = inc.amount+ (+order.totalAmt);
          }
        });
        console.log(this.income);
        let dataPoints = [];
        this.income.forEach(item =>{
          let data: {y: number, label: string} = {y: item.amount, label: item.monthName};
          dataPoints.push(data);
        });
        this.getLineGraph(dataPoints);
      });
    });
  }

  getTotalCustomers(){
    this.loginService.getAll().subscribe(res =>{
      res.forEach(order =>{
        this.totalCustomers = this.totalCustomers + 1;
      });
    })
  }

  getDateFormat(date: string): date{
    let Date: date ={
      day: +(date.substring(0, 2)),
      month: +(date.substring(3,5)),
      year: +(date.substring(6,10))
    }

    return Date;
  }

  getLineGraph(data){
    let chart2 = new CanvasJS.Chart("chartContainer2", {
      animationEnabled: true,
      theme: "light2",
      axisY:{
        includeZero: false,
        title: "Total Income (in Rupees)"
      },
      axisX:{
        title: "Months of year 2020"
      },
      data: [{        
        type: "line",
            indexLabelFontSize: 16,
        dataPoints: data
      }]
    });
    chart2.render();
    
  }

}

export interface Income{
  month: number;
  monthName?: string;
  amount: number; 
}

export interface date{
  day: number;
  month: number;
  year: number;
}
