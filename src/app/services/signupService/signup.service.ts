import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  // from here we call the server
  baseUrl = 'http://localhost:8080/rentingIt';

  constructor(private http: HttpClient) {}

  /**
   * api to register new user
   * @param userDetails
   * @returns
   */
  //setting up the user details as a post method to server for adding the data in DB
  addUser(userDetails: any) {
    //sending the post request to add user
    return this.http.post(`${this.baseUrl}/user/signup`, userDetails);
  }
}
