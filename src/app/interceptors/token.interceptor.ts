import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.authService.token;
    if (token != null) {
      let ignorarAuthorization = request.params.has('ignoreAuth');
      if (ignorarAuthorization) {
        return next.handle(request);
      } else {
        const authReq = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + token),
        });
        return next.handle(authReq);
        // return next.handle(authReq).pipe(
        //   catchError((error) => {
        //     if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/login') && error.status === 401) {
        //       console.log('ACA SE TOTEO POR AUTORIZACION CREO ', error);
        //       return throwError(() => error);
        //       // return this.handle401Error(authReq, next);
        //     }
        //     return throwError(() => error);
        //   })
        // );
      }
    }
    return next.handle(request);
  }
}
