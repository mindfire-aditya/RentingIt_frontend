/**
 * @author Aditya Sahu
 */
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
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
