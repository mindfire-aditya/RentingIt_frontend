import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //creating a object which will have the username and password for making a post call to get token.
  credentials = {
    username: '',
    password: '',
  };
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    //console.log("Form is submited!!");
    if (
      this.credentials.username != '' &&
      this.credentials.password != '' &&
      this.credentials.username != null &&
      this.credentials.password != null
    ) {
      //we have to submit the form

      console.log('Here form will be submited');
      this.loginService.generateToken(this.credentials).subscribe(
        (response: any) => {
          //success
          //settingup the token to local storage for loggin the user
          this.loginService.loginuser(
            response.id,
            response.username,
            response.email,
            response.roles,
            response.accessToken,
            response.tokenType
          );
          //taking the user to categories page where they can buy or rent the product
        },
        (error) => {
          //error
          console.log(error);
        }
      );

      // this.router.navigate(['user/my-products']);
      window.location.href = '/user/my-products';
    } else {
      console.log('Fields are empty !!');
    }
  }
}
