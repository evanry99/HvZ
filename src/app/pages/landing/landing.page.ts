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
export class LandingPage implements OnInit {
  
  //Variables
  showUserEdit: boolean = false;
 
  /**
   * Constructor with dependency injection
   * @param gameService 
   * @param userService 
   */
  constructor(
    readonly gameService: GameService,
    readonly userService: UserService
  ) { }
  
  /**
   * Getter for the games
   */
  get games(): Game[] {
    return this.gameService.games
  }

  get user(): UserDTO {
    return this.userService.userResponse;
  }

  /**
   * Function that runs on the initialization of the page. Checks if the user is authenticated, if not, the user needs to log in with keycloak to proceed to another page. A user object is sent to the addUser function when a user is authenticated where the API POST request is handled
   */
  async ngOnInit() {
    this.gameService.getGames()
    if(this.isAuthenticated() === true){
      await this.userService.getUserByUsername(keycloak.tokenParsed.preferred_username);
      if(!this.userService.userResponse || this.userService.userResponse.userName !== keycloak.tokenParsed.preferred_username){
        let user: UserDTO = {
        firstName: keycloak.tokenParsed.given_name,
        lastName: keycloak.tokenParsed.family_name,
        userName: keycloak.tokenParsed.preferred_username,
        isAdmin: keycloak.tokenParsed.realm_access.roles.includes("admin")
        }
        await this.userService.addUser(user);
        await this.userService.getUserByUsername(keycloak.tokenParsed.preferred_username);
      }
    }
  }

  /**
   * Checks if a user is authenticated.
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    return keycloak.authenticated
  }
  setUserEdit() {
    this.showUserEdit = !this.showUserEdit;
  }
}
