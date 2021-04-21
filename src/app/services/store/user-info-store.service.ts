import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoStoreService {
  private subject = new BehaviorSubject<any>({});

  private userData: any;
  storedUser = {
    id: localStorage.getItem('id'),
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    accessToken: localStorage.getItem('accessToken'),
    tokenType: localStorage.getItem('tokenType'),
  };

  userInfo: Observable<any> = this.subject.asObservable();

  saveUserInfo(response: any) {
    this.userData = response;
    this.subject.next(response);
    this.subject.next(this.storedUser);
  }

  removeUser() {
    this.userData = {};
    this.subject.next(this.userData);
  }

  constructor() {}
}
