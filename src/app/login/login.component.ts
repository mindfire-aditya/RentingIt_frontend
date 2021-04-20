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
          console.log(response);
          //settingup the token to local storage for loggin the user
          this.loginService.loginUser(response,response.accessToken);
          
          //taking the user to categories page where they can buy or rent the product
          this.router.navigate(['categories/all']);
        },
        (error) => {
          //error
          console.log(error);
        }
      );
    } else {
      console.log('Fields are empty !!');
    }
  }
}
