import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import keycloak from 'src/keycloak';


@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!keycloak.authenticated || !keycloak.token) {
      return next.handle(req);
    }

    const { token } = keycloak;

    const authRequest = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    })

    return next.handle(authRequest)
  }
}
