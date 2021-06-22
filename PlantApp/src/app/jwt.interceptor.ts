import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {

    const newBody = request.body;
    newBody.token = localStorage.getItem("token");
    alert("token in interceptor: " + newBody.token);
    const newRequest = request.clone({body: newBody});

    return next.handle(newRequest);
  }
}
