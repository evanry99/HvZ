import { Component, OnInit } from "@angular/core";
import { Game } from "src/app/models/game.model";
import { User, UserDTO } from "src/app/models/user.model";
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




  async ngOnInit() {
    this.gameService.getGames()
    if(this.isAuthenticated() === true){
      await this.userService.getUserByUsername(keycloak.tokenParsed.preferred_username);
      console.log(this.userService.userResponse);
      if(!this.userService.userResponse || this.userService.userResponse.firstName !== keycloak.tokenParsed.given_name){
        let user: UserDTO = {
        firstName: keycloak.tokenParsed.given_name,
        lastName: keycloak.tokenParsed.family_name,
        userName: keycloak.tokenParsed.preferred_username,
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
