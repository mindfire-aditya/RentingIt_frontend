import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductDetailsService } from '../services/productDetails/product-details.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  item: any;
  products: any;
  private subscription1: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription1 = this.activatedRoute.data.subscribe(
      (data) => {
        console.log(data);
        this.products = data.products;
      },
      (error) => {
        alert('Error fetching products');
      }
    );
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
