import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../services/userDetail/user-detail.service';
import { UserDetail } from '../models/user-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
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

  username = localStorage.getItem('username');

  constructor(private userDetail: UserDetailService, private router: Router) {}

  ngOnInit(): void {
    let id: any = localStorage.getItem('id');
    this.userDetail.getUserDetail(id).subscribe(
      (data) => {
        this.userInfo = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
        this.router.navigate(['user/my-profile/edit']);
      }
    );
  }
}
