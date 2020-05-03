import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AppComponent } from './app.component';
import { MainPageBodyComponent } from './main-page-body/main-page-body.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { LiveProductComponent } from './admin/live-product/live-product.component';
import { DeliveredOrderComponent } from './admin/delivered-order/delivered-order.component';
import { CancelledOrderComponent } from './admin/cancelled-order/cancelled-order.component';
import { SalesSummaryComponent } from './admin/sales-summary/sales-summary.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { PaymentComponent } from './payment/payment.component';
import { BillComponent } from './bill/bill.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { LoginComponent } from './login/login.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  { path: 'admin', component: AdminViewComponent},
  { path: 'main-page', component: MainPageBodyComponent},
  { path: 'admin/live-orders', component: LiveProductComponent},
  { path: 'admin/delivered-orders', component: DeliveredOrderComponent},
  { path: 'admin/cancelled-orders', component: CancelledOrderComponent},
  { path: 'admin/sales-summary', component: SalesSummaryComponent},
  { path: 'cart-details', component: CartDetailsComponent},
  { path: 'check-out', component:  CheckOutComponent},
  { path: 'payment', component:  PaymentComponent},
  { path: 'bill', component:  BillComponent},
  { path: 'login', component: LoginComponent},
  { path: 'track-order', component:  TrackOrderComponent},
  { path: 'order-history', component:  OrderHistoryComponent},
  { path: 'contact-us', component:  ContactUsComponent},
  { path: 'about-us', component:  AboutUsComponent},
  { path: 'forget-password', component:  ForgetPasswordComponent},
  { path: 'admin/admin-dashboard', component:  AdminDashboardComponent},
  { path: '', redirectTo: 'main-page', pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
