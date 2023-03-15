import { Component, OnInit } from "@angular/core";
import { Game } from "src/app/models/game.model";
import { GameService } from "src/app/services/game.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css']
})
export class LandingPage implements OnInit{
  constructor(
    readonly gameService:GameService
  ){}
  
  get games():Game[]{
    return this.gameService.games
  }

  async ngOnInit(): Promise<void> {
    await this.gameService.getGames();
  }
}
