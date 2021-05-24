import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'http://localhost:8080/rentingIt';

  constructor(private http: HttpClient) {}

  /**
   *
   * @param path
   * @returns
   */
  getCategories(path: string) {
    return this.http.get(`${this.baseUrl}/product/category/${path}`);
  }

  /**
   *
   * @returns
   */
  getAllCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/product/category/all`);
  }
}
