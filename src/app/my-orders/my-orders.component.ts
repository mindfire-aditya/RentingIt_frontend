/**
 * @author Aditya Sahu
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { MyOrder } from '../models/my-order';
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

  orderedProducts: MyOrder[] = [];
  productList: Product[] = [];
  showSpinner: boolean = true;

  imageBaseUrl =
    'http://localhost:8080/rentingIt/product/resources/download-image/';

  private subscription1: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription1 = this.subscription1 =
      this.activatedRoute.data.subscribe(
        (data) => {
          this.orderedProducts = data.orders;
          this.showSpinner = false;
          this.getProductDetailsFromOrder(this.orderedProducts);
        },
        (error) => {
          alert('Error fetching orders');
        }
      );
  }

  getProductDetailsFromOrder(orders: MyOrder[]) {
    orders.forEach((item) => {
      this.productService.getProductDetailById(item.productId).subscribe(
        (data) => {
          this.productList.push(data);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  sendDetails(item: any) {
    this.router.navigate(['user/my-orders/order-details', item.productId]);
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
