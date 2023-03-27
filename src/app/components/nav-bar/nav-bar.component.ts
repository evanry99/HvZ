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

  handleLogout() {
    storageClear();
    keycloak.logout();
  }


  handleLogin() {
      keycloak.login()
    }

  goToLanding() {
    this.router.navigateByUrl("/landing")
  }

  isNotLanding() {
    return this.router.url !== "/landing";
  }

  isAuthenticated(){
    return keycloak.authenticated
  }
}
  