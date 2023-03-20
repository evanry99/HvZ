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
    this.gameService.game = game;
    this.router.navigateByUrl("/game-detail")
  }

  ngOnInit(): void {
      this.gameService.getGames()
      

  }
}
