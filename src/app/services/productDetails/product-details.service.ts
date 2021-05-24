import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  // from here we call the server
  baseUrl = 'http://localhost:8080/rentingIt';
  bike = 'Bike';
  constructor(private http: HttpClient) {}

  /**
   *
   * @returns
   */
  getProductsByName() {
    //sending the post request to add user
    return this.http.get(`${this.baseUrl}/product/search/${this.bike}`);
  }

  /**
   *
   * @param productDetails
   * @returns
   */
  //for adding products for renting purpose
  addProducts(productDetails: any) {
    return this.http.post(
      `${this.baseUrl}/product/register-products-for-rent/`,
      productDetails
    );
  }

  /**
   *
   * @returns
   */
  getAllCategories() {
    return this.http.get(`${this.baseUrl}/product/category/all`);
  }

  /**
   *
   * @returns
   */
  getProductsByOwnerId() {
    return this.http.get(`${this.baseUrl}/product/currently-loggedin/`);
  }

  /**
   *
   * @param productId
   * @returns
   */
  getProductDetailById(productId: number) {
    return this.http.get<Product>(`${this.baseUrl}/product/${productId}`);
  }
}
