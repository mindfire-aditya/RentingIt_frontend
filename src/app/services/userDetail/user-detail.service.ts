import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetail } from '../../models/user-detail';
@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  baseUrl = 'http://localhost:8080/rentingIt/user';

  constructor(private http: HttpClient) {}

  getUserDetail(id: number) {
    return this.http.get<UserDetail>(`${this.baseUrl}/view-info/${id}`);
  }

  editUserDetail(id: number, payload: UserDetail) {
    return this.http.put<string>(`${this.baseUrl}/update-info/${id}`, payload);
  }

  addUserDetail(id: number, payload: UserDetail) {
    return this.http.post(`${this.baseUrl}/add-info/${id}`, payload);
  }
}
