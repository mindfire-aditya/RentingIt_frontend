import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { LoginService } from '../services/loginService/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
   //making a property which will tell what should be shown when user is logged in
   public loggedIn = false;
   constructor(private loginService:LoginService) {}
 
   ngOnInit(): void {
     this.loggedIn = this.loginService.isLogged();
   }
 
   logoutUser(){
     this.loginService.logout()
     //location.reload()
     window.location.href="/home";
   }
}
