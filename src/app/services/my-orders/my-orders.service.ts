import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyOrder } from 'src/app/models/my-order';

@Injectable({
  providedIn: 'root',
})
export class MyOrdersService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:8080/rentingIt';

  getOrderById(id: number) {
    return this.http.get<MyOrder>(`${this.baseUrl}/order/${id}`);
  }

  getMyProductsOnRent(userId: number) {
    return this.http.get<MyOrder[]>(
      `${this.baseUrl}/order/my-products-on-rent/${userId}`
    );
  }

  getOrdersByProductId(productId: number) {
    return this.http.get<MyOrder[]>(
      `${this.baseUrl}/order/orders-by-product-id/${productId}`
    );
  }
}
