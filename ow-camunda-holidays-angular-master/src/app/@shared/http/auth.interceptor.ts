import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const savedCredentials = sessionStorage.getItem('credentials') || localStorage.getItem('credentials');
    if (savedCredentials) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${savedCredentials}`,
        },
      });
    }

    return next.handle(request);
  }
}
