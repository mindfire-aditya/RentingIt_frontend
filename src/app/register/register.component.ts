import { Component, OnInit } from '@angular/core';
import { SignupService } from '../services/signupService/signup.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //defining my custom userdetails object
  userDetails = {
    username: '',
    email: '',
    password: '',
    role: ['user'],
  };

  constructor(private signup: SignupService) {}
  ngOnInit(): void {}

  //function for registering the user
  registerUser() {
    //console.log("Form is submited!!");
    if (
      this.userDetails.username != '' &&
      this.userDetails.email != '' &&
      this.userDetails.password != '' &&
      this.userDetails.username != null &&
      this.userDetails.email != '' &&
      this.userDetails.password != null
    ) {
      //we have to submit the form

      console.log('Here form will be submited');
      this.signup.addUser(this.userDetails).subscribe(
        (response: any) => {
          //success
          console.log(response);
          window.location.href = '/login';
        },
        (error: any) => {
          //error
          console.log(error);
        }
      );
    } else {
      console.log('Fields are empty !!');
    }
  }
}
