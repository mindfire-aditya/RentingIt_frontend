/**
 * @author Aditya Sahu
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoStoreService {
  private subject = new BehaviorSubject<any>({});

  private userData: any;

  userInfo: Observable<any> = this.subject.asObservable();

  emitUserInfo() {
    this.subject.next({
      id: localStorage.getItem('id'),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      accessToken: localStorage.getItem('accessToken'),
      tokenType: localStorage.getItem('tokenType'),
    });
  }

  removeUser() {
    this.userData = {};
    this.subject.next(this.userData);
  }

  getUserInfo() {
    this.userData = {
      id: localStorage.getItem('id'),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      accessToken: localStorage.getItem('accessToken'),
      tokenType: localStorage.getItem('tokenType'),
    };
    return {
      id: localStorage.getItem('id'),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      accessToken: localStorage.getItem('accessToken'),
      tokenType: localStorage.getItem('tokenType'),
    };
  }

  constructor() {}
}
