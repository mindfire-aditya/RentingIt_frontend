import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService/login.service';
import { ProductService } from '../services/products/product.service';
import { UserInfoStoreService } from '../services/store/user-info-store.service';

@Component({
  selector: 'app-navbar-logged-in',
  templateUrl: './navbar-logged-in.component.html',
  styleUrls: ['./navbar-logged-in.component.css'],
})
export class NavbarLoggedInComponent implements OnInit {
  //making a property which will tell what should be shown when user is logged in
  public loggedIn = localStorage.getItem('accessToken') ? true : false;

  private token: any;

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
    });
    console.log(this.username);

    if (this.username == '' || this.username == undefined) {
      console.log('username not stored');
      this.username = 'My account';
    } else {
      this.username = localStorage.getItem('username');
    }
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
    this.loggedIn = false;
    this.userInfoStore.removeUser();
    this.router.navigate(['home']);
  }
}
