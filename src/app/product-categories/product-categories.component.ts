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

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      console.log(data);
      this.allCategories = data.allCategories;
    });
  }
}
