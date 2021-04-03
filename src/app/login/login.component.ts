import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginModel = new Login('', '');
  isInvalid = false;

  constructor() {}

  ngOnInit(): void {}

  validateEmail() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(String(this.loginModel.email).toLowerCase()));
    return re.test(String(this.loginModel.email).toLowerCase());
  }

  validatePassword() {}

  onValidate() {
    this.isInvalid = this.validateEmail();
  }

  onSubmit() {
    console.log(this.loginModel);
  }
}
