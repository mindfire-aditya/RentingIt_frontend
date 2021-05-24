/**
 * @author Aditya Sahu
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetail } from '../../models/user-detail';
@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  baseUrl = 'http://localhost:8080/rentingIt/user';

  constructor(private http: HttpClient) {}

  userId = localStorage.getItem('id');

  /**
   *
   * @returns
   */
  getUserDetail() {
    return this.http.get<UserDetail>(
      `${this.baseUrl}/view-info/${this.userId}`
    );
  }

  /**
   *
   * @param id
   * @returns
   */
  getUserDetailById(id: number) {
    return this.http.get<UserDetail>(`${this.baseUrl}/view-info/${id}`);
  }

  /**
   *
   * @param ownerId
   * @returns
   */
  getOwnerDetail(ownerId: number) {
    return this.http.get<UserDetail>(`${this.baseUrl}/view-info/${ownerId}`);
  }

  /**
   *
   * @param id
   * @param payload
   * @returns
   */
  editUserDetail(id: number, payload: UserDetail) {
    return this.http.put<string>(`${this.baseUrl}/update-info/${id}`, payload);
  }

  /**
   *
   * @param id
   * @param payload
   * @returns
   */
  addUserDetail(id: number, payload: UserDetail) {
    return this.http.post(`${this.baseUrl}/add-info/${id}`, payload);
  }
}
