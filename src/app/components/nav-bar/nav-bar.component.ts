import { Component } from '@angular/core';
import { Router } from '@angular/router';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  roles = keycloak.tokenParsed.realm_access.roles;
  constructor(private readonly router: Router) { } // wass/pass & admin/admin & 

  handleLogout() {
    keycloak.logout()
  }

  handleLogin() {
    keycloak.login()
  }

  handleLogToken() {
    console.log("Keycloak token: ", keycloak.token);
    console.log("Keycloak token parsed: ", keycloak.tokenParsed);
    console.log("User roles: ", this.roles);
    console.log("Is admin: ", this.roles.includes("admin"));
  }

  handleMakeAdmin() { //TODO
    if (!this.roles.includes('admin')) {
      this.roles.push("admin")
      console.log("was not admin");      
    } else {
      this.roles.filter(word => word !== 'admin')
      console.log("was admin");
      
    }
    console.log("User roles: ", this.roles);
  }

  goToLanding() {
    this.router.navigateByUrl("/landing")
  }

  isNotLanding() {
    return this.router.url !== "/landing";
  }
}
