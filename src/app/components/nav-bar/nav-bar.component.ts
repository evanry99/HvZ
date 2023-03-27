import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import keycloak from 'src/keycloak';
import { User } from 'src/app/models/user.model';
import { storageClear } from 'src/app/utils/storage.util';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private readonly router: Router) { } 

  /**
   * Function to handle the logout button click. Clears the session storage and uses the keycloack logout function.
   */
  handleLogout() {
    storageClear();
    keycloak.logout();
  }

  /**
   * Function to handle the login button click. Calls the keycloak login function that redirects the user to the third party login page.
   */
  handleLogin() {
      keycloak.login();
    }
  
  /**
   * Function to handle the main button click. Navigates the user to the landing page.
   */
  goToLanding() {
    this.router.navigateByUrl("/landing")
  }

  /**
   * Function to update the router url when the page is not landing.
   * @returns {string}
   */
  isNotLanding() {
    return this.router.url !== "/landing";
  }

  /**
   *   Function to check if the user is authenticated.
   * @returns {boolean}
   */
  isAuthenticated(){
    return keycloak.authenticated
  }
}
  