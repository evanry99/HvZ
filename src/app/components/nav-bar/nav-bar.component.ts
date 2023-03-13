import { Component } from '@angular/core';
import { Router } from '@angular/router';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private readonly router: Router){}

  handleLogout(){
    keycloak.logout()
  }

  handleLogin() {
    keycloak.login()
  }

  handleLogToken() {
    console.log("Keycloak token parsed: ", keycloak.tokenParsed);
    console.log("Keycloak token: ", keycloak.token);
  }

  goToLanding(){
    this.router.navigateByUrl("/landing")
  }

  isNotLanding(){
    return this.router.url !== "/landing";
  }
}
