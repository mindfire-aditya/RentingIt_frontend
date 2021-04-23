import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetail } from '../models/user-detail';
import { UserDetailService } from '../services/userDetail/user-detail.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
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

  name = this.userInfo.firstName + ' ' + this.userInfo.lastName;

  ngOnInit(): void {
    this.userDetailService.getUserDetail(this.id).subscribe(
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
    this.userDetailService
      .editUserDetail(this.id, this.userInfo)
      .subscribe((data) => {
        console.log('Response', data);
      });
  }

  addUserDetail() {
    this.userDetailService
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
    this.router.navigate([this.router.url]);
  }
}
