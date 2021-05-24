import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyOrder } from '../models/my-order';
import { Product } from '../models/product';
import { UserDetail } from '../models/user-detail';
import { MyOrdersService } from '../services/my-orders/my-orders.service';
import { ProductDetailsService } from '../services/productDetails/product-details.service';
import { UserDetailService } from '../services/userDetail/user-detail.service';

@Component({
  selector: 'app-my-products-on-rent',
  templateUrl: './my-products-on-rent.component.html',
  styleUrls: ['./my-products-on-rent.component.css'],
})
export class MyProductsOnRentComponent implements OnInit, OnDestroy {
  orderList: MyOrder[] = [];
  userOrders: MyOrder[] = [];
  productDetailsList: Product[] = [];
  userDetailsList: UserDetail[] = [];
  imageBaseUrl =
    'http://localhost:8080/rentingIt/product/resources/download-image/';

  showSpinner: boolean = true;
  private subscription1: Subscription = new Subscription();
  private subscription2: Subscription = new Subscription();
  private subscription3: Subscription = new Subscription();

  /**
   *
   * @param myOrdersService
   * @param router
   * @param productService
   * @param userDetailService
   */
  constructor(
    private myOrdersService: MyOrdersService,
    private router: Router,
    private productService: ProductDetailsService,
    private userDetailService: UserDetailService
  ) {}

  ngOnInit(): void {
    let productId = Number(this.router.url.split('/').pop());

    let userId = Number(localStorage.getItem('id'));
    this.subscription1 = this.myOrdersService
      .getMyProductsOnRent(userId)
      .subscribe((data) => {
        this.orderList = data;

        this.userOrders = this.orderList.filter(
          (item) => item.productId == productId
        );

        this.getProductDetailsFromOrder(this.userOrders);
        this.getUserDetailsByOrders(this.userOrders);
      });
  }

  /**
   *
   * @param orders
   */
  getProductDetailsFromOrder(orders: MyOrder[]) {
    orders.forEach((item) => {
      this.subscription2 = this.productService
        .getProductDetailById(item.productId)
        .subscribe(
          (data) => {
            data.imageUrl = this.imageBaseUrl + data.imageUrl;
            this.productDetailsList.push(data);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  /**
   *
   * @param orders
   */
  getUserDetailsByOrders(orders: MyOrder[]) {
    orders.forEach((item) => {
      this.subscription3 = this.userDetailService
        .getUserDetailById(item.customerId)
        .subscribe((data) => {
          this.userDetailsList.push(data);
        });
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }
}
