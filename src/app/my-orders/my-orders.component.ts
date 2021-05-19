/**
 * @author Aditya Sahu
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { ProductDetailsService } from '../services/productDetails/product-details.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductDetailsService
  ) {}

  orderedProducts: Order[];
  productList: Product[];
  showSpinner: boolean = true;

  private subscription1: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription1 = this.subscription1 =
      this.activatedRoute.data.subscribe(
        (data) => {
          this.orderedProducts = data.orders;
          this.showSpinner = false;
        },
        (error) => {
          alert('Error fetching orders');
        }
      );

    this.getProductsFromIds(this.orderedProducts);
  }

  getProductsFromIds(orders: Order[]) {
    const productIds = orders.map(({ productId }) => productId);

    for (let id in productIds) {
      this.productService
        .getProductDetailById(Number(productIds[id]))
        .subscribe(
          (data) => {
            this.productList.push(data);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  sendDetails(item: any) {
    this.router.navigate(['user/my-orders/order-details', item.productId]);
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
