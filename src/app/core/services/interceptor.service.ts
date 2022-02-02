import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {



  token!: boolean;
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = this.authService.checkLogIn()
    if (this.token) {
      const tokenizedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token).set('Content-Type', 'application/json')
          .set('Access-Control-Allow-Origin', '*')
          .set('Access-Control-Allow-Headers', 'Content-Type')
          .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      });
      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }
}
