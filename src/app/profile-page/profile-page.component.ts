import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../services/userDetail/user-detail.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  constructor(private userDetail: UserDetailService) {}

  ngOnInit(): void {}
}
