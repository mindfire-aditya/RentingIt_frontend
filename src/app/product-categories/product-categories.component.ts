import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class ProductCategoriesComponent implements OnInit {
  constructor(private productService: ProductService) {}

  public allCategories: any;

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe((data) => {
      this.allCategories = data;
    });
  }
}
