/**
 * @author Aditya Sahu
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ImageUploadResponse } from 'src/app/models/image-upload-response';
import { Category } from 'src/app/models/category';
import { NewProduct } from 'src/app/models/new-product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // from here we call the server
  baseUrl = 'http://localhost:8080/rentingIt';
  constructor(private http: HttpClient) {}

  //setting up the user details as a post method to server for adding the data in DB also UI

  /**
   *
   * @returns
   */
  getProducts() {
    //sending the post request to add user
    return this.http.get(`${this.baseUrl}/product/search/Bike`);
  }

  /**
   *
   * @returns
   */
  getAllCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/product/category/all`);
  }

  /**
   *
   * @returns
   */
  getProductsByOwnerId() {
    return this.http.get<Product[]>(
      `${this.baseUrl}/product/currently-loggedin/`
    );
  }

  /**
   *
   * @returns
   */
  getAllProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/product/all`);
  }

  /**
   *
   * @param id
   * @returns
   */
  getProductById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/product/${id}`);
  }

  /**
   *
   * @param id
   * @returns
   */
  removeProduct(id: number) {
    return this.http.delete(
      `${this.baseUrl}/product/delete-owner-registered-product-by-id/${id}`
    );
  }

  serviceUrl = 'http://localhost:8080/rentingIt/product/resources/get-image/';
  //serviceUrl = "http://localhost:8080/rentingIt/product/resources/get-image/Bike.png"

  uploadPath =
    'http://localhost:8080/rentingIt/product/resources/upload-single-image';

  /**
   *
   * @param name
   * @returns
   */
  getImage(name: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/product/resources/get-image/${name}`
    );
    // .map((response : Response) => {
    //   return response.json(); }
  }

  /**
   *
   * @param name
   * @returns
   */
  downloadImage(name: string) {
    return this.http.get<Blob[]>(
      `${this.baseUrl}/product/resources/download-image/${name}`
    );
  }

  /**
   *
   * @param file
   * @returns
   */
  upload(file: any) {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post<ImageUploadResponse>(this.uploadPath, formData);
  }

  /**
   *
   * @param id
   * @returns
   */
  getProductsByCategoryId(id: number) {
    return this.http.get<Product[]>(
      `${this.baseUrl}/product/category/id/${id}`
    );
  }

  /**
   *
   * @param id
   * @returns
   */
  getProductsByParentCategoryId(id: number) {
    return this.http.get<Product[]>(
      `${this.baseUrl}/product/category/parentId/${id}`
    );
  }

  /**
   *
   * @param id
   * @param payload
   * @returns
   */
  updateProduct(id: number, payload: NewProduct) {
    return this.http.put(
      `${this.baseUrl}/product/update-registered-products/${id}`,
      payload
    );
  }
}
