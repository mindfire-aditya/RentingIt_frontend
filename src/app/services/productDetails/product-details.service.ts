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
   * returns products by name string
   * @returns
   */
  getProductsByName() {
    //sending the post request to add user
    return this.http.get(`${this.baseUrl}/product/search/${this.bike}`);
  }

  /**
   * to register new product for rent
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
   * returns all categories
   * @returns
   */
  getAllCategories() {
    return this.http.get(`${this.baseUrl}/product/category/all`);
  }

  /**
   * returns products from by owner id
   * @returns
   */
  getProductsByOwnerId() {
    return this.http.get(`${this.baseUrl}/product/currently-loggedin/`);
  }

  /**
   * returns product's detail by id
   * @param productId
   * @returns
   */
  getProductDetailById(productId: number) {
    return this.http.get<Product>(`${this.baseUrl}/product/${productId}`);
  }
}
