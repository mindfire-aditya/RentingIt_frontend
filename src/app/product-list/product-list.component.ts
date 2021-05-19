/**
 * @author Aditya Sahu
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  allProducts: Product[];
  products: Product[];
  allCategories: Category[];
  showSpinner: boolean = true;

  imageBaseUrl =
    'http://localhost:8080/rentingIt/product/resources/download-image/';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.products = [];
    this.allCategories = [];

    this.productService.getAllCategories().subscribe((data) => {
      this.allCategories = data;
    });

    let category = String(this.router.url.split('/').pop());

    this.productService.getAllProducts().subscribe((data) => {
      this.allProducts = data;
      this.removeOwnerProducts(data);
      this.products.forEach((item) => {
        item.imageUrl = this.imageBaseUrl + item.imageUrl;
      });
    });
  }

  removeOwnerProducts(data: Product[]) {
    let userId = Number(localStorage.getItem('id'));
    let result = data.filter((item) => item.ownerId !== userId);
    this.products = result;
  }

  onClick(id: number) {
    this.router.navigate(['user/my-products/product-details/', id]);
  }
}
