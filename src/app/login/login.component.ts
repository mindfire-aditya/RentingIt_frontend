/**
 * @author Aditya Sahu
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService/login.service';
import { UserInfoStoreService } from '../services/store/user-info-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  //creating a object which will have the username and password for making a post call to get token.
  credentials = {
    username: '',
    password: '',
  };

  private subscription1: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userInfoStore: UserInfoStoreService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    //console.log("Form is submited!!");
    if (
      this.credentials.username != '' &&
      this.credentials.password != '' &&
      this.credentials.username != null &&
      this.credentials.password != null
    ) {
      //we have to submit the form

      this.subscription1 = this.loginService
        .generateToken(this.credentials)
        .subscribe(
          (response: any) => {
            //success
            //settingup the token to local storage for loggin the user
            console.log(response);

            this.loginService.saveUser(
              response.id,
              response.username,
              response.email,
              response.roles,
              response.accessToken,
              response.tokenType
            );

            //taking the user to categories page where they can buy or rent the product

            let loggedIn: any = true;
            localStorage.setItem('loggedIn', loggedIn);

            this.loginService.changeNavbar();
            this.userInfoStore.emitUserInfo();
            this.router.navigate(['home']);
            window.location.href = '/home';
          },
          (error) => {
            //error

            alert(
              'Username or Password is incorrect. Please try again with valid credentials'
            );
          }
        );
    } else {
      console.log('Fields are empty !!');
    }
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
