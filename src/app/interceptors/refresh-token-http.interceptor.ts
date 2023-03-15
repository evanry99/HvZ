import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import keycloak from 'src/keycloak';

@Injectable()
export class RefreshTokenHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!keycloak.authenticated || keycloak.isTokenExpired() === false) {
      return next.handle(req);
    }

    const HOUR_IN_SECONDS = 3600;

    return from(keycloak.updateToken(HOUR_IN_SECONDS)).pipe(
      switchMap(() => {
        return next.handle(req);
      })
    )
  }
}
