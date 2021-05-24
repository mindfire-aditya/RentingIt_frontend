import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyOrder } from 'src/app/models/my-order';

@Injectable({
  providedIn: 'root',
})
export class PlaceOrderService {
  baseUrl = 'http://localhost:8080/rentingIt';

  constructor(private http: HttpClient) {}

  /**
   * setting up the order details as a post method to server for adding the data in DB
   * @param orderDetails
   * @returns
   */
  addOder(orderDetails: any) {
    //sending the post request to add order
    return this.http.post(`${this.baseUrl}/order/new-order`, orderDetails);
  }

  /**
   * get orders by customer id
   * @param userId
   * @returns
   */
  getOrdersByCustomerId(userId: number) {
    return this.http.get<MyOrder[]>(`${this.baseUrl}/order/all/${userId}`);
  }
}
