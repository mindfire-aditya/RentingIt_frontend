import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'RentingIt';
  loggedIn = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginService.loggedIn.subscribe((data) => {
      console.log(data);
      this.loggedIn = data;
      if (this.loggedIn == true) {
        this.router.navigate(['/categories/all']);
      }
    });
  }
}
