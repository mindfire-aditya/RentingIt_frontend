import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
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
   private token:any;
   constructor(private loginService:LoginService,private productservice:ProductService) {}
 
   ngOnInit(): void {
     this.loggedIn = this.loginService.isLogged();
   }
 
   getBikeProducts(){
     this.token = this.loginService.getToken();
     this.productservice.getProducts(this.token).subscribe(
      (response:any)=>{
        //success
        console.log(response);
        window.location.href = "/categories/bikes";
      },
      error=>{
        //error
        console.log(error);
      }
    )  
     
   }

   logoutUser(){
     this.loginService.logout()
     //location.reload()
     window.location.href="/home";
   }
}
