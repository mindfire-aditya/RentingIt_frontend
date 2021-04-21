import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService/login.service';
import { ProductService } from '../services/products/product.service';
import { UserInfoStoreService } from '../services/store/user-info-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //making a property which will tell what should be shown when user is logged in

  ngOnInit() {}
  // public loggedIn = localStorage.getItem('accessToken') ? true : false;

  // private token: any;
  // userData: any;

  // public username = localStorage.getItem('username');

  // constructor(
  //   private loginService: LoginService,
  //   private productservice: ProductService,
  //   private router: Router,
  //   private userInfoStore: UserInfoStoreService
  // ) {}

  // ngOnInit(): void {
  //   this.loginService.loginStatus.subscribe((data) => {
  //     this.loggedIn = data;
  //     console.log(data);
  //   });

  //   this.userInfoStore.userInfo.subscribe((data) => {
  //     this.userData = data;
  //     console.log(data);
  //   });
  // }
}
