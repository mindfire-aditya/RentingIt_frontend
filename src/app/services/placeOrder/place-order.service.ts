import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlaceOrderService {
  baseUrl = 'http://localhost:8080/rentingIt';
  userid = 19;

  constructor(private http:HttpClient) {}

  //setting up the orderdetails as a post method to server for adding the data in DB
 addOder(orderDetails:any){
  //sending the post request to add order
  return this.http.post(`${this.baseUrl}/order/new-order`,orderDetails);
}

getOrdersByCustomerId(){
  return this.http.get(`${this.baseUrl}/order/all/${this.userid}`);
}
}
