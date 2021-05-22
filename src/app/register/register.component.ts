/**
 * @author Aditya Sahu
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  private subscription1: Subscription = new Subscription();

  constructor(private signup: SignupService, private router: Router) {}
  ngOnInit(): void {}

  //function for registering the user
  registerUser() {
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
      this.subscription1 = this.signup.addUser(this.userDetails).subscribe(
        (response: any) => {
          //success
          console.log(response);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          //error
          alert('Registration Unsuccessful');
        }
      );
    } else {
      console.log('Fields are empty !!');
    }
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
