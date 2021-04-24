import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserDetailService } from '../../userDetail/user-detail.service';

@Injectable({
  providedIn: 'root',
})
export class UserDetailResolver implements Resolve<any> {
  constructor(private userDetailService: UserDetailService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.userDetailService.getUserDetail();
  }
}
