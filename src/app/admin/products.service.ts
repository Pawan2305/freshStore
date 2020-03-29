import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Products, SelectedProducts } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = 'http://localhost/api';
  product: Products[];
  selectedProduct: SelectedProducts = new SelectedProducts();
                
  constructor(private http: HttpClient) { }

  getSelectedProduct(): SelectedProducts{
    return this.selectedProduct;
  }
  
  setSelectedProducts(selectedProduct: SelectedProducts){
    this.selectedProduct = selectedProduct;
  }

  getAllProducts(): Observable<Products[]> {
    return this.http.get(`${this.baseUrl}/productList.php`).pipe(
      map((res) => {
        this.product = res['data'];
        return this.product;
    }),
    catchError(this.handleError));
  }

  addProduct(productData: Products): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/addProduct.php`, { data: productData })
      .pipe(map((res) => {
        console.log(res);
        console.log("Data Inserted");
        return true;
      }),
      catchError(this.handleError));
  }

  editProduct(productData: Products): Observable<boolean> {
    return this.http.put(`${this.baseUrl}/updateProduct.php`, { data: productData })
      .pipe(map((res) => {
        console.log(res);
        console.log(" Product Updated");
        return true;
      }),
      catchError(this.handleError));
  }

  deleteProduct(id: number): Observable<boolean> {
    const params = new HttpParams()
      .set('productId', id.toString());

    return this.http.delete(`${this.baseUrl}/deleteProduct.php`, { params: params })
      .pipe(map(res => {
        console.log("Product Deleted");
        return true;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
