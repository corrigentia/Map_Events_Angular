import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly sessionService: SessionService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser = this.sessionService.data;
    console.log(currentUser);

    if (currentUser) {
      if (currentUser.token !== '') {
        let requestClone = request.clone({ setHeaders: { 'Authorization': 'Bearer ' + currentUser.token } });
        return next.handle(requestClone);
      }
    }

    return next.handle(request);
  }
}
