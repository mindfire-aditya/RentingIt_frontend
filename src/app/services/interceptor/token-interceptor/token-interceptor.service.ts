/**
 * @author Aditya Sahu
 */
import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  /**
   *  intercepts http requests and adds an authorization token
   * @param req
   * @param next
   * @returns
   */
  intercept(req: any, next: any) {
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return next.handle(tokenizedReq);
  }
}
