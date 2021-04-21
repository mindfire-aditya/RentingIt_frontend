import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent implements OnInit {
  constructor(private productService: ProductService) {}

  userProducts: any;

  ngOnInit(): void {
    this.productService.getProductsByOwnerId().subscribe((data) => {
      this.userProducts = data;
      console.log(data);
    });
  }
}
