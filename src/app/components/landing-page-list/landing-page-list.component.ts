import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Game } from "src/app/models/game.model";
import { GameService } from "src/app/services/game.service";

@Component({
  selector: 'app-landing-page-list',
  templateUrl: './landing-page-list.component.html',
  styleUrls: ['./landing-page-list.component.css']
})
export class LandingPageListComponent implements OnInit{
  @Input() games: Game[] = [];

 
  constructor(
    private readonly gameService: GameService,
    private readonly router: Router){}

  async goToGame(game: Game){
    //console.log(game)
    this.gameService.game = game;
    this.router.navigateByUrl("/game-detail")
  }

  ngOnInit() {

      this.gameService.getGames()
      console.log(this.gameService.games)
      this.gameService.games.forEach(game=>
          this.gameService.getNumberOfPlayersInGame(game.id)
        )

  }
}
