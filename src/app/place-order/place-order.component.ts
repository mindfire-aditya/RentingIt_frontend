import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
  newOrder = new Order(0, 0, 0, '', 1, new Date(), new Date(), false, 0);

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.newOrder);
  }
}
