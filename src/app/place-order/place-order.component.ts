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
  ) {}

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
      value: this.newOrder.total_amount.toString(),
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

    if (rent_mode == 'per hour') {
      if (diff.hourdif <= 0 && diff.datedif <= 0) {
        alert('Please select atleast an hour within the month');
      } else {
        this.newOrder.total_amount =
          (diff.hourdif + diff.datedif * 24) *
          this.product_item.pricePerHour *
          this.newOrder.units;
      }
    } else if (rent_mode == 'per day') {
      if (diff.datedif <= 0 && diff.monthdif <= 0) {
        alert('Please select atleast a day');
      } else {
        this.newOrder.total_amount =
          (diff.datedif + diff.monthdif * 28) *
          this.product_item.pricePerDay *
          this.newOrder.units;
      }
    } else if (rent_mode == 'per week') {
      if (diff.datedif / 7 <= 0 && diff.monthdif <= 0) {
        throw new Error('Less than a week is not allowed');
      } else {
      }
    } else {
      if (diff.monthdif <= 0) {
        throw new Error('Less than a month is not allowed');
      } else {
      }
    }
  }

  dateTimeDifference(start: Date, end: Date) {
    start = new Date(start);
    end = new Date(end);

    let datedif = end.getDate() - start.getDate();
    let hourdif = end.getHours() - start.getHours();
    let minutedif = end.getMinutes() - start.getMinutes();
    let monthdif = end.getMonth() + 1 - start.getMonth() + 1;

    return {
      datedif: datedif,
      monthdif: monthdif,
      hourdif: hourdif,
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
