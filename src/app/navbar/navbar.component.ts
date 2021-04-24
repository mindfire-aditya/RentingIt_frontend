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
  ngOnInit() {}
}
