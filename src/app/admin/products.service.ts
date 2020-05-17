import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Products, SelectedProducts } from './product';
import { CartItems } from '../products-cart.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = "http://localhost/api";
  product: Products[];
  orginalProduct: Products[];
  selectedProduct: SelectedProducts = new SelectedProducts();
  isAdmin: boolean = true;
  
                
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
        console.log(res['data']);
        this.orginalProduct = res['data'];
        console.log(this.orginalProduct);
        return this.product;
    }),
    catchError(this.handleError));
  }

  getProductById(item): Observable<Products>{
    return this.http.post(`${this.baseUrl}/getProductById.php`, {data: item}).pipe(
      map((res) => {
        const product: Products = {
          productId: res['productId'],
          productName: res['productName'],
          category: res['category'],
          pricePerKg: res['pricePerKg'],
          marketPrice: res['marketPrice'],
          totalQty: res['totalQty'],
          qtyRemain: res['qtyRemain'],
          image: res['image']
      };
        return product;
    }),
    catchError(this.handleError));
  }

  addProduct(productData: Products): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/addProduct.php`, { data: productData})
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

  uploadImage(formData): Observable<string>{

    console.log(formData);
    return this.http.post(`${this.baseUrl}/uploadImage.php`, formData)
    .pipe(map(res => {
      console.log(res.toString());
      return res.toString();
    }),
    catchError(this.handleError));
  }

  getImage(imageUrl: string): Observable<Blob> {
    const url = this.baseUrl+'/'+imageUrl;
    console.log(url);
    return this.http.get(url, { responseType: 'blob' });
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    return throwError('Error! something went wrong.');
  }
}
