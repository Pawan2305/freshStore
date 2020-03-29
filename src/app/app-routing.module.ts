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


const routes: Routes = [
  { path: 'admin', component: AdminViewComponent},
  { path: 'main-page', component: MainPageBodyComponent},
  { path: 'admin/live-orders', component: LiveProductComponent},
  { path: 'admin/delivered-orders', component: DeliveredOrderComponent},
  { path: 'admin/cancelled-orders', component: CancelledOrderComponent},
  { path: 'admin/sales-summary', component: SalesSummaryComponent},
  { path: '', redirectTo: 'main-page', pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
