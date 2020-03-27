import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AppComponent } from './app.component';
import { MainPageBodyComponent } from './main-page-body/main-page-body.component';


const routes: Routes = [
  { path: 'admin/add-product', component: AddProductComponent},
  { path: 'main-page', component: MainPageBodyComponent},
  { path: '', redirectTo: '/main-page', pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
