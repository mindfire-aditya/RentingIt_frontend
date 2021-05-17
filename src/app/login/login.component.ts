/**
 * @author Aditya Sahu
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService/login.service';
import { UserInfoStoreService } from '../services/store/user-info-store.service';
import { UserDetailService } from '../services/userDetail/user-detail.service';

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
    private userInfoStore: UserInfoStoreService,
    private userDetailsService: UserDetailService
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
            this.loginService.saveUser(
              response.id,
              response.username,
              response.email,
              response.roles,
              response.accessToken,
              response.tokenType
            );
            let loggedIn: any = true;
            localStorage.setItem('loggedIn', loggedIn);

            this.loginService.changeNavbar();
            this.userInfoStore.emitUserInfo();

            this.userDetailsService.getUserDetailById(response.id).subscribe(
              (data) => {
                console.log(data);
                this.router.navigate(['/categories/all']);
                window.location.href = '/categories/all';
              },
              (error) => {
                console.log(error);
                this.router.navigate(['/user/my-profile/edit']);
                window.location.href = '/user/my-profile/edit';
              }
            );
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
