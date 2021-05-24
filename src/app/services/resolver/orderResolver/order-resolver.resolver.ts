import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PlaceOrderService } from '../../placeOrder/place-order.service';

@Injectable({
  providedIn: 'root',
})
export class OrderResolverResolver implements Resolve<any> {
  constructor(private placeOrderService: PlaceOrderService) {}

  /**
   *
   * @param route
   * @param state
   * @returns
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.placeOrderService.getOrdersByCustomerId(
      Number(localStorage.getItem('id'))
    );
  }
}
