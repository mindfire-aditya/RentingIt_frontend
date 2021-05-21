import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../models/order';
import { PlaceOrderService } from '../services/placeOrder/place-order.service';
import { ProductService } from '../services/products/product.service';
import { UserDetailService } from '../services/userDetail/user-detail.service';
import { render } from 'creditcardpayments/creditCardPayments';
import { Product } from '../models/product';
import { MyOrder } from '../models/my-order';
import { MyOrdersService } from '../services/my-orders/my-orders.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userDetailService: UserDetailService,
    private placeOrderService: PlaceOrderService,
    private myOrdersService: MyOrdersService,
    private router: Router
  ) { }

  ordersListByProductId: MyOrder[] = [];
  newOrder: Order;
  product_item: Product;
  pickup_address: any;
  actualName: any;
  ownerId: any;
  customerId = localStorage.getItem('id');
  imageBaseUrl =
    'http://localhost:8080/rentingIt/product/resources/download-image/';

  today: string;
  public image: any;
  private subscription1: Subscription = new Subscription();
  private subscription2: Subscription = new Subscription();

  ngOnInit(): void {
    this.today = new Date().toISOString();
    let rem = this.today.split(':');
    rem.pop();
    this.today = rem.join(':');

    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    this.newOrder = new Order(0, 0, 0, '', 1, new Date(), new Date(), true, 0);

    let customerId = Number(localStorage.getItem('id'));

    this.newOrder.customerId = customerId;

    if (productId !== null) {
      this.subscription1 = this.subscription1 = this.productService
        .getProductById(parseInt(productId))
        .subscribe(
          (data) => {
            this.product_item = data;

            this.ownerId = this.product_item.ownerId;
            this.actualName = this.product_item.actualName;
            this.getOwnerInfo(this.ownerId);
            this.product_item.imageUrl =
              this.imageBaseUrl + this.product_item.imageUrl;
            this.newOrder.ownerId = this.ownerId;
            this.newOrder.productId = this.product_item.id;
          },
          (error) => console.log(error)
        );
    } else {
      console.log('Null Id: ', productId);
    }

    //placed orders of the product to check availibilty
    this.myOrdersService
      .getOrdersByProductId(Number(productId))
      .subscribe((data) => {
        console.log('orders of product:', data);
      });

    //paypal render method
    render({
      id: '#myPaypalButtons',
      currency: 'INR',
      value: this.newOrder.total_amount.toString(),
      onApprove: (details) => {
        alert('Transection Successfull!!');
      }
    });
  }

  getOwnerInfo(ownerId: number) {
    if (ownerId) {
      this.subscription2 = this.userDetailService
        .getOwnerDetail(this.ownerId)
        .subscribe(
          (data) => {
            this.pickup_address = data;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  calculateTotalPrice(start: Date, end: Date) {
    let diff = this.dateTimeDifference(start, end);

    let rent_mode = this.newOrder.rent_mode;
    this.newOrder.total_amount = 0;

    switch (rent_mode) {
      case 'per hour':
        this.newOrder.total_amount =
          this.newOrder.units * diff.hours * this.product_item.pricePerHour;
        break;
      case 'per day':
        this.newOrder.total_amount =
          this.newOrder.units * diff.days * this.product_item.pricePerDay;
        break;
      case 'per week':
        this.newOrder.total_amount =
          this.newOrder.units * diff.weeks * this.product_item.pricePerWeek;
        break;
      case 'per month':
        this.newOrder.total_amount =
          this.newOrder.units * diff.months * this.product_item.pricePerMonth;
        break;
      default:
    }
  }

  dateTimeDifference(start: Date, end: Date) {
    start = new Date(start);
    end = new Date(end);

    let msInDay = 1000 * 3600 * 24;

    let timeDiff = end.getTime() - start.getTime();

    let days = Math.ceil(timeDiff / msInDay);
    let hours = Math.ceil(timeDiff / (1000 * 3600));
    let weeks = Math.floor(days / 7);
    let months = Math.floor(days / 30);

    return {
      days: days,
      months: months,
      hours: hours,
      weeks: weeks,
    };
  }

  onSubmit() {
    if (
      this.newOrder.rent_mode != '' &&
      this.newOrder.rent_mode != null &&
      this.newOrder.terms_and_conditions != false
    ) {
      this.newOrder.terms_and_conditions = this.checkProductAvailibilty(
        this.newOrder.start_datetime,
        this.newOrder.end_datetime
      );

      console.log(this.newOrder.terms_and_conditions);

      // this.placeOrderService.addOder(this.newOrder).subscribe(
      //   (data) => {
      //     console.log(data);
      //     this.router.navigate(['user/my-orders']);
      //   },
      //   (error) => {
      //     error(error);
      //   }
      // );
    } else {
      console.log('Fields are empty !!');
    }
  }

  checkProductAvailibilty(start: Date, end: Date): boolean {
    console.log(start);
    console.log(end);

    start = new Date(start);
    end = new Date(end);

    let startTimeInMs = start.getTime();
    let endTimeInMs = end.getTime();

    let startAvailibilty = true;
    let endAvailibilty = true;

    for (let i in this.ordersListByProductId) {
      if (
        this.ordersListByProductId[i].rentEndDate.getTime() <= startTimeInMs
      ) {
        startAvailibilty = false;
        break;
      }

      if (
        this.ordersListByProductId[i].rentStartDate.getTime() >= endTimeInMs
      ) {
        endAvailibilty = false;
        break;
      }
    }

    return startAvailibilty && endAvailibilty;
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
