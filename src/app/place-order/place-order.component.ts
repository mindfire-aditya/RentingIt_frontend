import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../models/order';
import { ProductService } from '../services/products/product.service';
import { UserDetailService } from '../services/userDetail/user-detail.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
  newOrder = new Order(0, 0, 0, '', 1, new Date(), new Date(), false, 0);
  product_item: any;
  pickup_address: any;
  ownerId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userDetailService: UserDetailService
  ) {}

  private subscription1: Subscription = new Subscription();
  private subscription2: Subscription = new Subscription();

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      this.subscription1 = this.productService
        .getProductById(parseInt(id))
        .subscribe(
          (data) => {
            this.product_item = data;
            this.ownerId = this.product_item.ownerId;
            this.getOwnerInfo(this.ownerId);
          },
          (error) => console.log(error)
        );
    } else {
      console.log('Id: ', id);
    }
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

  onSubmit() {
    console.log(this.newOrder);
  }
}
