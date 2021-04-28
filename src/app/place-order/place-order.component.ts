import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
  newOrder = new Order('', 1, new Date(), new Date(), false);

  constructor() {}

  ngOnInit(): void {}
  onSubmit() {
    let rent_mode = document.getElementById('rent_mode');
    console.log(rent_mode);
    console.log('Hello');
  }

  onSelect() {
    console.log('REnt mode');
  }
}
