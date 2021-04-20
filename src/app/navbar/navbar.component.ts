import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { LoginService } from '../services/loginService/login.service';
import { ProductService } from "../services/products/product.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //making a property which will tell what should be shown when user is logged in
  public loggedIn = false;
  public token:any;

  constructor(private loginService: LoginService, private router: Router,private productService: ProductService) {}

  ngOnInit(): void {
    this.loggedIn = this.loginService.isLogged();
  }

  logoutUser() {
    this.loginService.logout();
    this.loggedIn = false;
    this.router.navigate(['home']);
  }

  getBikeProducts(){
    this.token = 'Bearer '+(this.loginService.getToken());
    this.productService.getProducts(this.token).subscribe(
      (response: any) => {
        //success
        console.log(response);

        //taking the user to categories page where they can buy or rent the product
        this.router.navigate(['categories/bikes']);
      },
      (error) => {
        //error
        console.log(error);
      }
    );

  }
}
