import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Game } from "src/app/models/game.model";
import { User } from "src/app/models/user.model";
import { GameService } from "src/app/services/game.service";
import { UserService } from "src/app/services/user.service";
import{faTrash} from "@fortawesome/free-solid-svg-icons"
import keycloak from "src/keycloak";
@Component({
  selector: 'app-landing-page-list',
  templateUrl: './landing-page-list.component.html',
  styleUrls: ['./landing-page-list.component.css']
})
export class LandingPageListComponent implements OnInit{
  //Input
  @Input() games: Game[] = [];

  //Variables
  _user: User;

  //Declare icons
  faTrash = faTrash
 
  //Constructor with dependency injection
  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly router: Router){}

  

  //Runs on the initialization of the component. Updates the user variable to the current user and calls the game service to get all games and to get the number of players in each game.
  ngOnInit() {
      this._user = this.userService.userResponse;
      this.gameService.getGames();
      this.gameService.games.forEach(game=>
          this.gameService.getNumberOfPlayersInGame(game.id)
        );
  }

  /**
   * Function to make the date and time more readable for the end user.
   * @param date 
   * @returns {string}
   */
  timeToReadable(date: string): string {
    const d = new Date(date);
    return d.toLocaleString("no");
  }

  /**
   * Function to handle the delete button click. Calls the deleteGame function in the gameService that handles the API DELETE request.
   * @param game 
   */
  deleteGame(game:Game){
    this.gameService.deleteGame(game)
  }
  
  /**
   * Function to handle the view game button click. Checks if the user is authenticated, then updates the current game in the game service to the clicked game and navigates to the game-details page.
   * @param game 
   */
  async goToGame(game: Game){
    if(!keycloak.authenticated){
      keycloak.login();
    }
    this.gameService.game = game;
    this.router.navigateByUrl("/game-detail");
  }
}
