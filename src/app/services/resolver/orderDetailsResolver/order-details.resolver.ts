import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from '../../products/product.service';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsResolver implements Resolve<any> {
  constructor(private productService: ProductService) {}

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
    return this.productService.getProductById(2);
  }
}
