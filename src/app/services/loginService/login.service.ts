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

  /**
   *  saves and emits loggedin state to navbar component
   */
  changeNavbar() {
    let loggedIn: any = localStorage.getItem('loggedIn');
    this.loginNavbarSource.next(loggedIn);
  }

  /**
   * injected Http
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   *  posts login credentials and return a token if exits.
   * @param credentials
   * @returns
   */
  //calling the server for getting the token and store it in local sotrage
  generateToken(credentials: any) {
    //generate token
    return this.http.post(`${this.baseUrl}/user/signin`, credentials);
  }

  /**
   * saves user information in local storage and emits user info
   * @param id
   * @param username
   * @param email
   * @param roles
   * @param accessToken
   * @param tokenType
   * @returns
   */
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

  /**
   * checks whether loggedin, if true then returns token
   * @returns
   */
  //to check whether a user is logged in or not
  isLogged() {
    let token = localStorage.getItem('accessToken');
    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * on logout removes user info from local storage
   * @returns
   */
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

  /**
   * gets user id from local storage
   * @returns
   */
  getUserId() {
    return localStorage.getItem('id');
  }

  /**
   *
   * @returns gets user name from local storage
   */
  getUserName() {
    return localStorage.getItem('username');
  }

  /**
   * gets user email from local storage
   * @returns
   */
  getUserEmail() {
    return localStorage.getItem('email');
  }

  /**
   * gets user role from local storage
   * @returns
   */
  getRoles() {
    return localStorage.getItem('roles');
  }

  /**
   * gets token from local storage
   * @returns
   */
  getToken() {
    return localStorage.getItem('accessToken');
  }

  /**
   * gets token type from local storage
   * @returns
   */
  getTokenType() {
    return localStorage.getItem('tokenType');
  }
}
