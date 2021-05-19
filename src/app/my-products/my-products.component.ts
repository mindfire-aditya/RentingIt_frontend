/**
 * @author Aditya Sahu
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent implements OnInit, OnDestroy {
  imageBaseUrl =
    'http://localhost:8080/rentingIt/product/resources/download-image/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  userProducts: Product[];
  private subscription1: Subscription;

  ngOnInit(): void {
    this.subscription1 = this.activatedRoute.data.subscribe(
      (data) => {
        this.userProducts = data.products;
        this.userProducts.forEach((item) => {
          item.imageUrl = this.imageBaseUrl + item.imageUrl;
        });
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
