import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import keycloak from 'src/keycloak';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!keycloak.authenticated) {
      alert("You have to log in to see the game page!");
      this.router.navigateByUrl("/");
      return false;
    }

    const { role } = route.data

    if (keycloak.hasRealmRole(role)) {
      return true;
    }
    else {
      return false;
    }

  }

}
