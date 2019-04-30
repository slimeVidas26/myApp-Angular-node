import { Injectable } from '@angular/core';
// need httpInterceptor inteface
import { HttpInterceptor } from '@angular/common/http';
// token lives in the service
import { ApiService } from './api.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private api: ApiService) { }

  intercept(req,next) {
    // we cant just add to header, must clone it
    // and add the token
    let tokenizedHeader = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.api.token}`
      }
    });
    return next.handle(tokenizedHeader);
  }

}
