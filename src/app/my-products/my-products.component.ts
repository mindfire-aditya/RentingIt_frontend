/**
 * @author Aditya Sahu
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  userProducts: any;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      console.log(data);
      this.userProducts = data.products;
    });
  }
}
