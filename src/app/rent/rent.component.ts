/**
 * @author Aditya Sahu
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../models/category';
import { ImageUploadResponse } from '../models/image-upload-response';
import { NewProduct } from '../models/new-product';
import { CategoryService } from '../services/category/category.service';
import { ProductDetailsService } from '../services/productDetails/product-details.service';
import { ProductService } from '../services/products/product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  public newProduct: NewProduct;
  public imageFile: any;
  public allCategories: Category[];
  public imageUploadResponse: ImageUploadResponse;

  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;

  constructor(
    private registerProductsService: ProductDetailsService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription2 = new Subscription();
    this.subscription1 = new Subscription();

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
      1, //change this
      1,
      Number(localStorage.getItem('id'))
    );

    this.subscription3 = this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.allCategories = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registerProduct() {
    if (this.newProduct.productName != '' && this.newProduct.actualName != '') {
      //image upload

      this.subscription1 = this.productService.upload(this.imageFile).subscribe(
        (res) => {
          this.imageUploadResponse = res;
          console.log(this.imageUploadResponse.fileName);
          this.newProduct.imageUrl = this.imageUploadResponse.fileName;

          this.subscription2 = this.registerProductsService
            .addProducts(this.newProduct)
            .subscribe(
              (res) => {
                console.log(res);
                this.router.navigate(['/user/my-products']);
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
          alert('Product registration unsuccessfull. Please try again');
        }
      );
    } else {
      console.log('Fields are empty !!');
    }
  }

  onChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }
}
