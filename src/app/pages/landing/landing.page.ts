import { Component, OnInit } from "@angular/core";
import { Game } from "src/app/models/game.model";
import { User } from "src/app/models/user.model";
import { GameService } from "src/app/services/game.service";
import { UserService } from "src/app/services/user.service";
import keycloak from "src/keycloak";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css']
})
export class LandingPage implements OnInit{

  constructor(
    readonly gameService:GameService,
    readonly userService: UserService
  ){}
  
  get games():Game[]{
    return this.gameService.games
  }




  ngOnInit(): void {
    this.gameService.getGames()
    if(this.isAuthenticated() === true){
      //Todo: Check if user already is logged in- Do not add user multiple times
      // Edit this
      if(this.userService.user.firstName !== keycloak.tokenParsed.given_name){
        let user: User = {
        firstName: keycloak.tokenParsed.given_name,
        lastName: keycloak.tokenParsed.family_name,
        isAdmin: keycloak.tokenParsed.realm_access.roles.includes("admin")
      }
      this.userService.addUser(user)
    }
    }
      
  }

  isAuthenticated():boolean{
    return keycloak.authenticated
  }
}
