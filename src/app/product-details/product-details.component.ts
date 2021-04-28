import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from '../services/productDetails/product-details.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  products: any;
  private subscription1: any;

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
