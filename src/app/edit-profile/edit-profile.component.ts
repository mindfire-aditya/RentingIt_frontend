/**
 * @author Aditya Sahu
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDetail } from '../models/user-detail';
import { UserDetailService } from '../services/userDetail/user-detail.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  constructor(
    private userDetailService: UserDetailService,
    private router: Router
  ) {}

  id: any = localStorage.getItem('id');
  username = localStorage.getItem('username');
  firstTimeLogin = true;
  userInfo: UserDetail = new UserDetail(
    '',
    '',
    0,
    0,
    0,
    '',
    '',
    '',
    '',
    '',
    0,
    '',
    ''
  );

  private subscription1: any;
  private subscription2: any;
  private subscription3: any;

  name = this.userInfo.firstName + ' ' + this.userInfo.lastName;

  ngOnInit(): void {
    this.subscription1 = this.userDetailService.getUserDetail().subscribe(
      (data) => {
        this.userInfo = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        this.firstTimeLogin = true;
      }
    );

    if (this.firstTimeLogin == true) {
    }
  }

  editUserDetail() {
    this.subscription2 = this.userDetailService
      .editUserDetail(this.id, this.userInfo)
      .subscribe((data) => {
        console.log('Response', data);
      });
  }

  addUserDetail() {
    this.subscription3 = this.userDetailService
      .addUserDetail(this.id, this.userInfo)
      .subscribe((res) => {});
  }

  onSubmit() {
    if (this.firstTimeLogin == true) {
      this.addUserDetail();
    } else {
      this.editUserDetail();
    }
    this.router.navigate(['user/my-profile']);
    // this.router.navigate([this.router.url]);
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }
}
