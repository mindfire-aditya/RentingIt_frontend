import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // from here we call the server
  baseUrl = 'http://localhost:8080/rentingIt';

  loginNavbarSource = new Subject<boolean>();
  loginStatus = this.loginNavbarSource.asObservable();

  userInfoSource = new Subject<any>();
  userInfo = this.userInfoSource.asObservable();

  changeNavbar() {
    let loggedIn: any = localStorage.getItem('loggedIn');
    this.loginNavbarSource.next(loggedIn);
  }

  constructor(private http: HttpClient) {}

  //calling the server for getting the token and store it in local sotrage
  generateToken(credentials: any) {
    //generate token
    return this.http.post(`${this.baseUrl}/user/signin`, credentials);
  }

  //for login take the token and store it in localstorage
  saveUser(
    id: any,
    username: string,
    email: string,
    roles: string,
    accessToken: string,
    tokenType: string
  ) {
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('roles', roles);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('tokenType', tokenType);

    this.userInfoSource.next({
      id,
      username,
      email,
      roles,
      accessToken,
      tokenType,
    });

    return true;
  }

  //to check whether a user is logged in or not
  isLogged() {
    let token = localStorage.getItem('accessToken');
    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  //for logout
  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenType');

    let loggedIn: any = false;
    localStorage.setItem('loggedIn', loggedIn);

    return true;
  }

  //for getting user details
  getUserId() {
    return localStorage.getItem('id');
  }
  getUserName() {
    return localStorage.getItem('username');
  }
  getUserEmail() {
    return localStorage.getItem('email');
  }
  getRoles() {
    return localStorage.getItem('roles');
  }
  getToken() {
    return localStorage.getItem('accessToken');
  }
  getTokenType() {
    return localStorage.getItem('tokenType');
  }
}
