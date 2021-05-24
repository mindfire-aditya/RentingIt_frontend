import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlaceOrderService } from '../services/placeOrder/place-order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
})
export class OrderItemComponent implements OnInit, OnDestroy {
  constructor(private activatedRoute: ActivatedRoute) {}

  orderedProducts: any;
  productdetails: any;
  private subscription1: Subscription;

  ngOnInit(): void {
    this.subscription1 = new Subscription();
    this.subscription1 = this.activatedRoute.data.subscribe(
      (data) => {
        console.log(data);
        this.orderedProducts = data.orders;
      },
      (error) => {
        alert('Error fetching orders');
      }
    );
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
