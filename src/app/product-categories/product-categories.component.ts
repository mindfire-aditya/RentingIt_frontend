/**
 * @author Aditya Sahu
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class ProductCategoriesComponent implements OnInit {
  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  parentCategories: any;
  public allCategories: any;
  private subscription1: Subscription = new Subscription();
  category: any = '';

  ngOnInit(): void {
    let url = this.router.url;
    let arr = url.split('/');

    switch (arr.pop()) {
      case 'appliances':
        this.category = 'parentcategory/appliance';
        break;
      case 'bikes':
        this.category = 'parentcategory/Motor Cycle';
        break;

      case 'cars':
        this.category = 'parentcategory/Car';
        break;

      case 'electronics':
        this.category = 'parentcategory/Electronics';
        break;

      case 'furnitures':
        this.category = 'parentcategory/Furnitures';
        break;

      case 'machines':
        this.category = 'parentcategory/Fashion Clothing';
        break;

      case 'all':
        this.category = 'all';
        break;

      default:
        this.category = 'all';
    }

    this.subscription1 = this.categoryService
      .getCategories(this.category)
      .subscribe((data) => {
        this.allCategories = data;

        this.parentCategories = [
          ...new Set(
            this.allCategories.map(
              (item: { parentCategory: any }) => item.parentCategory
            )
          ),
        ];
      });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
