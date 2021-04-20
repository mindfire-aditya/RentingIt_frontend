import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // from here we call the server
  baseUrl = 'http://localhost:8080/rentingIt';

  constructor(private http: HttpClient) {}

  //calling the server for getting the token and store it in local sotrage
  generateToken(credentials: any) {
    //generate token
    return this.http.post(`${this.baseUrl}/user/signin`, credentials);
  }

  //for login take the token and store it in localstorage
  loginuser(
    id: any,
    username: string,
    email: string,
    roles: string,
    accessToken: string,
    tokenType: string
  ) {
    //localStorage.setItem('user', user);
    //console.log(user);
    //this.token = localStorage.getItem("accessToken");
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('roles', roles);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('tokenType', tokenType);
    console.log(accessToken);
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
    localStorage.removeItem('accessToken');
    return true;
  }

  //for getting token
  getToken() {
    return localStorage.getItem('accessToken');
  }
}
