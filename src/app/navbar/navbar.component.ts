/**
 * @author Aditya Sahu
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public allCategories: Category[];
  public parentCategories: any;
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.subscription = new Subscription();
    this.subscription = this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.allCategories = data;
        this.parentCategories = this.parentCategoriesList(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  parentCategoriesList(data: Category[]) {
    return [
      ...new Set(
        data.map((item: { parentCategory: any }) => item.parentCategory)
      ),
    ];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
