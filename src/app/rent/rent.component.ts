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
import { FormGroup, FormBuilder, Validator } from '@angular/forms';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  public newProduct: NewProduct;
  public imageFile: any;
  public allCategories: Category[];
  public parentCategories: any;
  public childCategories: string[];
  public imageUploadResponse: ImageUploadResponse;

  myForm: FormGroup;

  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;

  constructor(
    private registerProductsService: ProductDetailsService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({});
    this.allCategories = [];

    this.subscription2 = new Subscription();
    this.subscription1 = new Subscription();

    this.newProduct = new NewProduct(
      '',
      '',
      '1',
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
        this.parentCategories = this.parentCategoriesList(data);
        console.log(this.parentCategories);
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

  onSelectCategory(category: any) {
    console.log(category.value);
    this.childCategories = [];

    this.allCategories.forEach((item) => {
      if (item.parentCategory === category.value) {
        this.childCategories.push(item.childCategory);
      }
    });
  }

  onSelectSubCategory(category: any, subcategory: any) {
    console.log(category.value, subcategory.value);

    this.allCategories.filter((item) => {
      if (
        category.value == item.parentCategory &&
        subcategory.value == item.childCategory
      ) {
        this.newProduct.categoryId = item.id;
        this.newProduct.parentCategoryId = item.parentCategoryId;
        console.log(this.newProduct);

        return true;
      } else {
        return false;
      }
    });
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
