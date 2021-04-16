import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // from here we call the server
  baseUrl = "http://localhost:8080/rentingIt"
  constructor(private http:HttpClient) { }


 //setting up the user details as a post method to server for adding the data in DB
 getProducts(token:any){
  //sending the post request to add user
  return this.http.get(`${this.baseUrl}/product/all`,token);
}

}
