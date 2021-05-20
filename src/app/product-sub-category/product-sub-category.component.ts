import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-product-sub-category',
  templateUrl: './product-sub-category.component.html',
  styleUrls: ['./product-sub-category.component.css'],
})
export class ProductSubCategoryComponent implements OnInit {
  products: Product[];
  allCategories: Category[];
  showSpinner: boolean = true;
  imageBaseUrl =
    'http://localhost:8080/rentingIt/product/resources/download-image/';

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.products = [];
    this.allCategories = [];
    let arr = this.router.url.split('/');
    let categoryId = Number(arr.pop());
    let parentcatName = String(arr.pop());
    parentcatName =
      parentcatName?.charAt(0).toUpperCase() + parentcatName?.slice(1);
    let parentCategoryId;
    let userId = Number(localStorage.getItem('id'));

    this.productService.getAllCategories().subscribe((data) => {
      this.allCategories = data;

      let obj = data.find(
        (item) => item.id == categoryId && item.parentCategory == parentcatName
      );

      parentCategoryId = Number(obj?.parentCategoryId);

      this.productService
        .getProductsByParentCategoryId(parentCategoryId)
        .subscribe((data) => {
          this.products = data.filter(
            (item) => item.ownerId !== userId && item.categoryId == categoryId
          );
          this.showSpinner = false;
          this.products.forEach((item) => {
            item.imageUrl = this.imageBaseUrl + item.imageUrl;
          });
        });
    });
  }
  onClick(id: number) {
    this.router.navigate(['user/my-products/product-details/', id]);
  }
}
