import { Component } from '@angular/core';
import { Router } from '@angular/router';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private readonly router: Router) { } 

  handleLogout() {
    keycloak.logout()
  }

  handleLogin() {
    keycloak.login()
  }

  handleLogToken() {
    console.log("Keycloak token: ", keycloak.token);
    console.log("Keycloak token parsed: ", keycloak.tokenParsed);
    console.log("User roles: ", keycloak.tokenParsed.realm_access.roles);
    console.log("Is admin: ", keycloak.tokenParsed.realm_access.roles.includes("admin"));
    console.log("Username: ", keycloak.tokenParsed.preferred_username);
  }

  handleMakeAdmin() {
    if (!keycloak.tokenParsed.realm_access.roles.includes('admin')) {
      keycloak.tokenParsed.realm_access.roles.push("admin")
      console.log("User is now admin");
    } else {
      keycloak.tokenParsed.realm_access.roles.forEach((element, index) => {
        if (element === 'admin') keycloak.tokenParsed.realm_access.roles.splice(index, 1);
      });
      console.log("User is no longer admin");

    }
    console.log("User roles: ", keycloak.tokenParsed.realm_access.roles);
  }

  goToLanding() {
    this.router.navigateByUrl("/landing")
  }

  isNotLanding() {
    return this.router.url !== "/landing";
  }
}
  