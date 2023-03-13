import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import keycloak from 'src/keycloak';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private readonly router: Router) { }

  logout() {
    console.log("logged out");
  }

  handleLogin() {
    keycloak.login
  }

  goToLanding() {
    this.router.navigateByUrl("/landing")
  }
}
