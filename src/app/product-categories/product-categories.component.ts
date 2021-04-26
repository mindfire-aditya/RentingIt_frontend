/**
 * @author Aditya Sahu
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class ProductCategoriesComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  public allCategories: any;
  private subscription1: any;

  ngOnInit(): void {
    this.subscription1 = this.activatedRoute.data.subscribe(
      (data) => {
        console.log(data);
        this.allCategories = data.allCategories;
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
