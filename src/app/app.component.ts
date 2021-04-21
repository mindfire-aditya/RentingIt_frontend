import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/loginService/login.service';
import { UserInfoStoreService } from './services/store/user-info-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'RentingIt';

  userInfo: any;

  loggedIn = localStorage.getItem('accessToken') ? true : false;

  constructor(
    private loginService: LoginService,
    private userInfoStore: UserInfoStoreService
  ) {}

  ngOnInit() {
    this.userInfoStore.userInfo.subscribe((data) => {
      this.userInfo = data;
    });

    this.loginService.loginStatus.subscribe((data) => {
      this.loggedIn = data;
    });

    console.log(this.userInfoStore.getUserInfo());
  }
}
