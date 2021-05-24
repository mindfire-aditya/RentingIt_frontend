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
import { Product } from '../models/product';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  constructor(
    private registerProductsService: ProductDetailsService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public newProduct: NewProduct;
  public imageFile: any;
  public allCategories: Category[];
  public parentCategories: any;
  public childCategories: string[];
  public imageUploadResponse: ImageUploadResponse;
  public myProduct: Product;
  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;
  public productId: number;

  ngOnInit(): void {
    this.allCategories = [];

    this.subscription2 = new Subscription();
    this.subscription1 = new Subscription();

    this.productId = Number(
      this.activatedRoute.snapshot.paramMap.get('productId')
    );

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

    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((data) => {
        this.newProduct = data;
      });
    }

    this.subscription3 = this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.allCategories = data;
        this.parentCategories = this.parentCategoriesList(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   *
   * @param data
   * @returns
   */
  parentCategoriesList(data: Category[]) {
    return [
      ...new Set(
        data.map((item: { parentCategory: any }) => item.parentCategory)
      ),
    ];
  }

  /**
   *
   * @returns
   *
   */
  registerProduct() {
    if (this.newProduct.productName != '' && this.newProduct.actualName != '') {
      //image upload

      if (this.productId) {
        this.updateProduct(this.productId, this.newProduct);
        return;
      } else {
        this.subscription1 = this.productService
          .upload(this.imageFile)
          .subscribe(
            (res) => {
              this.imageUploadResponse = res;

              this.newProduct.imageUrl = this.imageUploadResponse.fileName;

              this.subscription2 = this.registerProductsService
                .addProducts(this.newProduct)
                .subscribe(
                  (res) => {
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
      }
    } else {
      console.log('Fields are empty !!');
    }

    console.log(this.newProduct);
  }

  /**
   *
   * @param id
   * @param payload
   */
  updateProduct(id: number, payload: NewProduct) {
    if (this.imageFile?.name) {
      this.productService.upload(this.imageFile).subscribe((res) => {
        this.imageUploadResponse = res;

        this.newProduct.imageUrl = this.imageUploadResponse.fileName;

        this.productService
          .updateProduct(this.productId, this.newProduct)
          .subscribe(
            (data) => {
              this.router.navigate(['/user/my-products']);
            },
            (err) => {
              alert('Product update failed, please try again.');
            }
          );
      });
    } else {
      this.productService
        .updateProduct(this.productId, this.newProduct)
        .subscribe(
          (data) => {
            this.router.navigate(['/user/my-products']);
          },
          (err) => {
            alert('Product update failed, please try again.');
          }
        );
    }

    this.productService
      .updateProduct(this.productId, this.newProduct)
      .subscribe(
        (data) => {
          alert('Product Updated');
        },
        (err) => {
          alert('Product update failed, please try again.');
        }
      );
  }

  /**
   *
   * @param category
   */
  onSelectCategory(category: any) {
    this.childCategories = [];

    this.allCategories.forEach((item) => {
      if (item.parentCategory === category.value) {
        this.childCategories.push(item.childCategory);
      }
    });
  }

  /**
   *
   * @param category
   * @param subcategory
   */
  onSelectSubCategory(category: any, subcategory: any) {
    this.allCategories.filter((item) => {
      if (
        category.value == item.parentCategory &&
        subcategory.value == item.childCategory
      ) {
        this.newProduct.categoryId = item.id;
        this.newProduct.parentCategoryId = item.parentCategoryId;

        return true;
      } else {
        return false;
      }
    });
  }

  /**
   *
   * @param event
   * @param file
   */
  onChange(event: any, file: any) {
    this.imageFile = event.target.files[0];
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }
}
