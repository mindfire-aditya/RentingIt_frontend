/**
 * @author Aditya Sahu
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  allProducts: any;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.allProducts = data;
      console.log(data);
    });
  }

  onClick(id: number) {
    this.router.navigate(['user/my-products/product-details/', id]);
  }
}
