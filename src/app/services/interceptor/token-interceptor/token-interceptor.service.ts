import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from '../../loginService/login.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: any, next: any) {
    let loginService = this.injector.get(LoginService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${loginService.getToken()}`,
      },
    });

    return next.handle(tokenizedReq);
  }
}
