/**
 * @author Aditya Sahu
 */

import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTransferService } from '../services/DataTransfer/data-transfer.service';
import { PlaceOrderService } from '../services/placeOrder/place-order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private dataTransfer:DataTransferService,
              private router:Router) {}

  orderedProducts: any;

  private subscription1: any;

  ngOnInit(): void {
    this.subscription1 = this.activatedRoute.data.subscribe(
      (data) => {
        console.log(data.orders);
        this.orderedProducts = data.orders;
      },
      (error) => {
        alert('Error fetching orders');
      }
    );
  }

  sendDetails(item:any) {
    console.log(item);
    this.dataTransfer.orderSub.next(item);
    this.router.navigate(["user/my-orders/order-details"]);
  }

}