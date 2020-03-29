import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { MainPageBodyComponent } from './main-page-body/main-page-body.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerComponent } from './customer/customer.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { MainPageComponent } from './admin/main-page/main-page.component';
import { DeliveredOrderComponent } from './admin/delivered-order/delivered-order.component';
import { CancelledOrderComponent } from './admin/cancelled-order/cancelled-order.component';
import { SalesSummaryComponent } from './admin/sales-summary/sales-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MainPageBodyComponent,
    SignUpComponent,
    FooterComponent,
    AddProductComponent,
    AdminNavbarComponent,
    MainPageComponent,
    AdminViewComponent,
    DeliveredOrderComponent,
    CancelledOrderComponent,
    SalesSummaryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
