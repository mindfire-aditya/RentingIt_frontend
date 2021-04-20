import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // from here we call the server
  baseUrl = "http://localhost:8080/rentingIt"
  constructor(private http:HttpClient) { }


 //setting up the post method to server for afething the product.
 getProducts(token:any){
  //sending the get request to fetch product
  return this.http.get(`${this.baseUrl}/product/all`,token);
}

}
