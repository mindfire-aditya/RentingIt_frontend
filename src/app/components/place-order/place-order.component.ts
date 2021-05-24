import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../../models/order';
import { PlaceOrderService } from '../../services/placeOrder/place-order.service';
import { ProductService } from '../../services/products/product.service';
import { UserDetailService } from '../../services/userDetail/user-detail.service';
import { render } from 'creditcardpayments/creditCardPayments';
import { Product } from '../../models/product';
import { MyOrder } from '../../models/my-order';
import { MyOrdersService } from '../../services/my-orders/my-orders.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
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
  isAvailable: boolean = true;
  showText: boolean = false;
  private subscription1: Subscription = new Subscription();
  private subscription2: Subscription = new Subscription();
  private subscription3: Subscription = new Subscription();
  private subscription4: Subscription = new Subscription();

  /**
   *
   * @param activatedRoute
   * @param productService
   * @param userDetailService
   * @param placeOrderService
   * @param myOrdersService
   * @param router
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userDetailService: UserDetailService,
    private placeOrderService: PlaceOrderService,
    private myOrdersService: MyOrdersService,
    private router: Router
  ) {}

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
      this.subscription1 = this.productService
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
    this.subscription2 = this.myOrdersService
      .getOrdersByProductId(Number(productId))
      .subscribe((data) => {
        this.ordersListByProductId = data;
      });
  }

  /**
   *
   * @param ownerId
   */
  getOwnerInfo(ownerId: number) {
    if (ownerId) {
      this.subscription3 = this.userDetailService
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

  /**
   *
   * @param start
   * @param end
   */
  calculateTotalPrice(start: Date, end: Date) {
    if (
      this.checkProductAvailibilty(
        this.newOrder.start_datetime,
        this.newOrder.end_datetime
      )
    ) {
      this.showText = true;
      this.isAvailable = true;
      let diff = this.dateTimeDifference(start, end);

      let rent_mode = this.newOrder.rent_mode;
      this.newOrder.total_amount = 0;
      let price = 0;
      switch (rent_mode) {
        case 'per hour':
          price =
            this.newOrder.units * diff.hours * this.product_item.pricePerHour;
          if (price <= 0) {
            alert('Please select appropriate Start and End datetime.');
            this.newOrder.total_amount = 0;
          } else {
            this.newOrder.total_amount =
              this.newOrder.units * diff.hours * this.product_item.pricePerHour;
          }

          break;

        case 'per day':
          price =
            this.newOrder.units * diff.hours * this.product_item.pricePerHour;
          if (price <= 0) {
            alert('Please select appropriate Start and End datetime.');
            this.newOrder.total_amount = 0;
          } else {
            this.newOrder.total_amount =
              this.newOrder.units * diff.days * this.product_item.pricePerDay;
          }

          break;

        case 'per week':
          price =
            this.newOrder.units * diff.hours * this.product_item.pricePerHour;
          if (price <= 0) {
            alert('Please select appropriate Start and End datetime.');
            this.newOrder.total_amount = 0;
          } else {
            this.newOrder.total_amount =
              this.newOrder.units * diff.weeks * this.product_item.pricePerWeek;
          }

          break;

        case 'per month':
          price =
            this.newOrder.units * diff.hours * this.product_item.pricePerHour;
          if (price <= 0) {
            alert('Please select appropriate Start and End datetime.');
            this.newOrder.total_amount = 0;
          } else {
            this.newOrder.total_amount =
              this.newOrder.units *
              diff.months *
              this.product_item.pricePerMonth;
          }
          break;
        default:
      }

      render({
        id: '#myPaypalButtons',
        currency: 'IN',
        value: this.newOrder.total_amount.toString(),
        onApprove: (details) => {
          alert('Transection Successfull!!');
          this.onSubmit();
        },
      });
    } else {
      this.showText = true;
      this.isAvailable = false;
    }
  }

  /**
   *
   * @param start
   * @param end
   * @returns
   */
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

  /**
   *
   */
  onSubmit() {
    if (
      this.newOrder.rent_mode != '' &&
      this.newOrder.rent_mode != null &&
      this.newOrder.terms_and_conditions != false
    ) {
      if (this.isAvailable) {
        this.subscription4 = this.placeOrderService
          .addOder(this.newOrder)
          .subscribe(
            (data) => {
              console.log(data);
              this.router.navigate(['user/my-orders']);
            },
            (error) => {
              error(error);
            }
          );
      } else {
        this.isAvailable = false;
      }
    } else {
      alert('Please fill all the fields');
    }
  }

  /**
   *
   * @param start
   * @param end
   * @returns
   */
  checkProductAvailibilty(start: Date, end: Date): boolean {
    start = new Date(start);
    end = new Date(end);
    let startTimeInMs = start.getTime();
    let endTimeInMs = end.getTime();

    for (let i in this.ordersListByProductId) {
      if (
        new Date(this.ordersListByProductId[i].rentEndDate).getTime() -
          startTimeInMs >=
        0
      ) {
        return false;
      }
      if (
        endTimeInMs -
          new Date(this.ordersListByProductId[i].rentStartDate).getTime() <=
        0
      ) {
        return false;
      }
    }

    return true;
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
  }
}
