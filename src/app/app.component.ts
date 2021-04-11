import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RentingIt';
  loggedIn = false;

  constructor(private loginService: LoginService) {}

  isLoggedIn() {
    this.loginService.loggedIn.subscribe(
      (data) => (this.loggedIn = data),
      (error) => console.error(error)
    );

    if (this.loggedIn === true) {
    }
  }
}
