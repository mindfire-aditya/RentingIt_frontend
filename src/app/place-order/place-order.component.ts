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

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userDetailService: UserDetailService,
    private placeOrderService: PlaceOrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.today = new Date().toISOString();
    let rem = this.today.split(':');
    rem.pop();
    this.today = rem.join(':');

    let id = this.activatedRoute.snapshot.paramMap.get('productId');
    this.newOrder = new Order(0, 0, 0, '', 1, new Date(), new Date(), true, 0);

    let customerId = Number(localStorage.getItem('id'));

    this.newOrder.customerId = customerId;

    if (id !== null) {
      this.subscription1 = this.subscription1 = this.productService
        .getProductById(parseInt(id))
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
      console.log('Null Id: ', id);
    }

    render({
      id: '#myPaypalButtons',
      currency: 'INR',
      value: '100',
      onApprove: (details) => {
        alert('Transection Successfull!!');
      },
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

    console.log(diff, rent_mode);
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
      console.log(this.newOrder);

      this.placeOrderService.addOder(this.newOrder).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['user/my-orders']);
        },
        (error) => {
          error(error);
        }
      );
    } else {
      console.log('Fields are empty !!');
    }
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
