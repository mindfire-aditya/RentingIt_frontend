import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  // from here we call the server
  baseUrl = 'http://localhost:8080/rentingIt';
  bike = "Bike";
  constructor(private http: HttpClient) {}

  getProductsByName() {
    //sending the post request to add user
    return this.http.get(`${this.baseUrl}/product/search/${this.bike}`);
  }

  //for adding products for renting purpose
  addProducts(productDetails:any){
    return this.http.post(`${this.baseUrl}/product/register-products-for-rent/`,productDetails);
  }

  getAllCategories() {
    return this.http.get(`${this.baseUrl}/product/category/all`);
  }

  getProductsByOwnerId() {
    return this.http.get(
      `${this.baseUrl}/product/currently-loggedin/`
    );
  }

  getProductDetailById(productId: number){
    return this.http.get(`${this.baseUrl}/product/${productId}`);
  }

}
