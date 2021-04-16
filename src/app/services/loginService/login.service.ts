import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // from here we call the server
  baseUrl = 'http://localhost:8080/rentingIt';

  constructor(private http: HttpClient) {}

  token:any = null;
  //calling the server for getting the token and store it in local sotrage
  generateToken(credentials: any) {
    //generate token
    return this.http.post(`${this.baseUrl}/user/signin`, credentials);
  }

  //for login take the token and store it in localstorage
  loginuser(user: any) {
    localStorage.setItem('user', user);
    console.log(user);
    this.token = localStorage.getItem("accessToken");
    localStorage.setItem('token', this.token);
    return true;
  }

  //to check whether a user is logged in or not
  isLogged() {
    let token = localStorage.getItem('token');
    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  //for logout
  logout() {
    localStorage.removeItem('token');
    return true;
  }

  //for getting token
  getToken() {
    return localStorage.getItem('token');
  }
}
