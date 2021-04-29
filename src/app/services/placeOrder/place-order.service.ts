import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlaceOrderService {
  baseUrl = 'http://localhost:8080/rentingIt';

  constructor(private placeOrderService: PlaceOrderService) {}
}
