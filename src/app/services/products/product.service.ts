/**
 * @author Aditya Sahu
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ImageUploadResponse } from 'src/app/models/image-upload-response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // from here we call the server
  baseUrl = 'http://localhost:8080/rentingIt';
  constructor(private http: HttpClient) {}

  //setting up the user details as a post method to server for adding the data in DB also UI

  getProducts() {
    //sending the post request to add user
    return this.http.get(`${this.baseUrl}/product/search/Bike`);
  }

  getAllCategories() {
    return this.http.get(`${this.baseUrl}/product/category/all`);
  }

  getProductsByOwnerId() {
    return this.http.get(`${this.baseUrl}/product/currently-loggedin/`);
  }

  getAllProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/product/all`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/product/${id}`);
  }

  serviceUrl = 'http://localhost:8080/rentingIt/product/resources/get-image/';
  //serviceUrl = "http://localhost:8080/rentingIt/product/resources/get-image/Bike.png"

  uploadPath =
    'http://localhost:8080/rentingIt/product/resources/upload-single-image';

  getImage(name: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/product/resources/get-image/${name}`
    );
    // .map((response : Response) => {
    //   return response.json(); }
  }

  upload(file: any) {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post<ImageUploadResponse>(this.uploadPath, formData);
  }
}
