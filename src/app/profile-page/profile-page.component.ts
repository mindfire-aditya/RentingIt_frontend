/**
 * @author Aditya Sahu
 */
import { Component, OnInit } from '@angular/core';

import { UserDetail } from '../models/user-detail';
import { ActivatedRoute, Router } from '@angular/router';

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
  private subscription1: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  /**
   *
   */
  category() {
    this.router.navigate(['categories/bikes']);
  }

  ngOnInit(): void {
    this.subscription1 = this.activatedRoute.data.subscribe(
      (data) => {
        this.userInfo = data.userDetail;
      },
      (error) => {
        console.log(error);

        this.router.navigate(['user/my-profile/edit']);
      }
    );
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
