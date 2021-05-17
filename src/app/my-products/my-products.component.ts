/**
 * @author Aditya Sahu
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  userProducts: any;
  private subscription1: any;

  ngOnInit(): void {
    this.subscription1 = this.activatedRoute.data.subscribe(
      (data) => {
        console.log(data);
        this.userProducts = data.products;
      },
      (error) => {
        alert('Error fetching products');
      }
    );
  }

  onRemove(id: number) {
    this.productService.removeProduct(id).subscribe(
      (data) => {
        console.log(data);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
