import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';

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
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { PaymentComponent } from './payment/payment.component';
import { BillComponent } from './bill/bill.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { RouterModule } from '@angular/router';
import { LiveProductComponent } from './admin/live-product/live-product.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

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
    SalesSummaryComponent,
    CartDetailsComponent,
    CheckOutComponent,
    PaymentComponent,
    BillComponent,
    LiveProductComponent,
    TrackOrderComponent,
    OrderHistoryComponent,
    ContactUsComponent,
    AboutUsComponent,
    ForgetPasswordComponent,
    AdminDashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    RouterModule.forChild([
      {path: 'home/:category', component: MainPageBodyComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
