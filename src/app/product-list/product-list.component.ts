/**
 * @author Aditya Sahu
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.allProducts = data;
      this.removeOwnerProducts(this.allProducts);
    });
  }

  removeOwnerProducts(data: Product[]) {
    let userId = Number(localStorage.getItem('id'));
    let result = data.filter((item) => item.ownerId !== userId);
    this.products = result;

    console.log(result);
  }

  onClick(id: number) {
    this.router.navigate(['user/my-products/product-details/', id]);
  }
}
