import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class ProductCategoriesComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  public allCategories: any;

  ngOnInit(): void {
    // this.productService.getAllCategories().subscribe((data) => {
    //   this.allCategories = data;
    //   console.log(data);
    // });

    this.activatedRoute.data.subscribe((data) => {
      console.log(data);
      this.allCategories = data.allCategories;
    });
  }
}
