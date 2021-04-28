/**
 * @author Aditya Sahu
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class ProductCategoriesComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  public allCategories: any;
  private subscription1: any;
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

    console.log(this.category);

    this.categoryService.getCategories(this.category).subscribe((data) => {
      this.allCategories = data;
      console.log(this.allCategories);
    });

    // this.subscription1 = this.activatedRoute.data.subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.allCategories = data.allCategories;
    //   },
    //   (error) => {
    //     alert('Error fetching products');
    //   }
    // );
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
