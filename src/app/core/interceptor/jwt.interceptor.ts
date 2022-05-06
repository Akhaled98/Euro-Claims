import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    // let currentUser = this.authenticationService.currentUserValue;
    // if (currentUser && currentUser.accessToken) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${currentUser.accessToken}`,
    //     },
    //   });
    // }

    return next.handle(request);
  }
}
