import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/loginService/login.service';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //making a property which will tell what should be shown when user is logged in
  public loggedIn = false;

  private token: any;

  public username = localStorage.getItem('username');

  constructor(
    private loginService: LoginService,
    private productservice: ProductService
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.loginService.isLogged();
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
        window.location.href = '/categories/bikes';
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
    window.location.href = '/home';
  }
}
