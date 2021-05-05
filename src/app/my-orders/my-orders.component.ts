/**
 * @author Aditya Sahu
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceOrderService } from '../services/placeOrder/place-order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

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

}