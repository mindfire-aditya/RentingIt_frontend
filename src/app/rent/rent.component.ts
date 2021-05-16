/**
 * @author Aditya Sahu
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewProduct } from '../models/new-product';
import { ProductDetailsService } from '../services/productDetails/product-details.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  newProduct: NewProduct;

  private subscription1: Subscription = new Subscription();

  constructor(private registerProductsService: ProductDetailsService) {}
  ngOnInit(): void {
    this.newProduct = new NewProduct(
      '',
      '',
      '',
      'available',
      '',
      '',
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    );
  }

  registerProducts() {
    if (
      this.newProduct.productName != '' &&
      this.newProduct.actualName != '' &&
      this.newProduct.assetStatus != ''
    ) {
      console.log('Here form will be submited');
      this.subscription1 = this.registerProductsService
        .addProducts(this.newProduct)
        .subscribe(
          (response: any) => {
            console.log(response);
            window.location.href = '/user/my-products';
          },
          (error: any) => {
            alert('Product Registration Unsuccessful');
          }
        );
    } else {
      console.log('Fields are empty !!');
    }
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
