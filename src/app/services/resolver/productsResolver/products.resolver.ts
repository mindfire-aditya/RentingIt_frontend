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
export class ProductsResolver implements Resolve<any> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.productService.getProductsByOwnerId();
  }
}
