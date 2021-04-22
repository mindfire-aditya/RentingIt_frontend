import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService/login.service';
import { ProductService } from '../services/products/product.service';
import { UserInfoStoreService } from '../services/store/user-info-store.service';

@Component({
  selector: 'app-navbar-loggedin',
  templateUrl: './navbar-loggedin.component.html',
  styleUrls: ['./navbar-loggedin.component.css'],
})
export class NavbarLoggedinComponent implements OnInit {
  public loggedIn = localStorage.getItem('accessToken') ? true : false;

  private token: any;
  userData: any;

  public username = localStorage.getItem('username');

  constructor(
    private loginService: LoginService,
    private productservice: ProductService,
    private router: Router,
    private userInfoStore: UserInfoStoreService
  ) {}

  ngOnInit(): void {
    this.loginService.loginStatus.subscribe((data) => {
      this.loggedIn = data;
      console.log(data);
    });

    this.userInfoStore.userInfo.subscribe((data) => {
      this.userData = data;
      console.log(data);
    });
  }

  getBikeProducts() {
    this.token = this.loginService.getToken();
    this.productservice.getProducts().subscribe(
      (response: any) => {
        //success
        console.log(response);
        this.router.navigate(['categories/bikes']);
      },
      (error) => {
        //error
        console.log(error);
      }
    );
  }

  logoutUser() {
    this.loginService.logout();
    //location.reload()
    // window.location.href = '/home';
    this.loggedIn = false;
    this.router.navigate(['login']);
    window.location.reload();
  }
}