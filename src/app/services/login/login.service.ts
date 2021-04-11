import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginRequest = new Subject<boolean>();

  loggedIn = this.loginRequest.asObservable();

  constructor() {}

  sendRequest() {
    this.loginRequest.next(true);
  }
}
