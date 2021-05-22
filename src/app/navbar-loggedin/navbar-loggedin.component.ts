/**
 * @author Aditya Sahu
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from '../services/category/category.service';
import { LoginService } from '../services/loginService/login.service';
import { PlaceOrderService } from '../services/placeOrder/place-order.service';
import { ProductDetailsService } from '../services/productDetails/product-details.service';
import { ProductService } from '../services/products/product.service';
import { UserInfoStoreService } from '../services/store/user-info-store.service';

@Component({
  selector: 'app-navbar-loggedin',
  templateUrl: './navbar-loggedin.component.html',
  styleUrls: ['./navbar-loggedin.component.css'],
})
export class NavbarLoggedinComponent implements OnInit, OnDestroy {
  public loggedIn: any = localStorage.getItem('accessToken') ? true : false;

  private token: any;
  userData: any;
  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;
  private subscription4: Subscription;
  private subscription5: Subscription;
  public allCategories: Category[];
  public parentCategories: any;
  public username = localStorage.getItem('username');

  constructor(
    private loginService: LoginService,
    private productservice: ProductService,
    private productDetailService: ProductDetailsService,
    private router: Router,
    private userInfoStore: UserInfoStoreService,
    private placeOrderService: PlaceOrderService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.subscription1 = new Subscription();
    this.subscription2 = new Subscription();
    this.subscription3 = new Subscription();
    this.subscription4 = new Subscription();
    this.subscription5 = new Subscription();

    this.subscription1 = this.loginService.loginStatus.subscribe(
      (data) => {
        this.loggedIn = data;
      },
      (error) => {
        alert('navbar not changed');
      }
    );

    this.subscription2 = this.userInfoStore.userInfo.subscribe(
      (data) => {
        this.userData = data;
      },
      (error) => {
        alert('user info not retrieved.');
      }
    );

    this.subscription5 = this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.allCategories = data;
        this.parentCategories = this.parentCategoriesList(data);
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

  getBikeProducts() {
    this.token = this.loginService.getToken();
    this.subscription3 = this.productDetailService
      .getProductsByName()
      .subscribe(
        (response: any) => {
          //success
          this.router.navigate(['categories/bikes']);
        },
        (error) => {
          //error
          alert('products fetching unsuccessful');
        }
      );
  }

  logoutUser() {
    this.loginService.logout();
    //location.reload()
    // window.location.href = '/home';
    this.loggedIn = false;
    localStorage.setItem('loggedIn', this.loggedIn);
    window.location.href = '/login';
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
    this.subscription5.unsubscribe();
  }
}
