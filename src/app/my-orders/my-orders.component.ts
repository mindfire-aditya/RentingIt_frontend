/**
 * @author Aditya Sahu
 */

import { isNgTemplate } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DataTransferService } from '../services/DataTransfer/data-transfer.service';
import { PlaceOrderService } from '../services/placeOrder/place-order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  orderedProducts: any;

  private subscription1: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription1 = this.subscription1 = this.activatedRoute.data.subscribe(
      (data) => {
        this.orderedProducts = data.orders;
        console.log(data.orders);
        
      },
      (error) => {
        alert('Error fetching orders');
      }
    );

  }

  sendDetails(item: any) {
    this.router.navigate(['user/my-orders/order-details', item.productId]);
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
  }
}
